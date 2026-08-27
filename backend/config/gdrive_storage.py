import os
import json
from django.core.files.storage import Storage
from django.core.exceptions import ImproperlyConfigured
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload


class GoogleDriveStorage(Storage):
    """
    A custom Django Storage backend that strictly preserves Django relative file
    names while storing files in a Google Drive folder.
    """

    def __init__(self):
        super().__init__()
        self._setup()
        # Per-instance caches to avoid redundant API calls
        self._url_cache = {}
        self._exists_cache = {}

    def _setup(self):
        self.folder_id = os.getenv('GOOGLE_DRIVE_FOLDER_ID')
        creds_json = os.getenv('GOOGLE_SERVICE_ACCOUNT_JSON')

        if not self.folder_id:
            raise ImproperlyConfigured("GOOGLE_DRIVE_FOLDER_ID is required when using GoogleDriveStorage.")
        if not creds_json:
            raise ImproperlyConfigured("GOOGLE_SERVICE_ACCOUNT_JSON is required when using GoogleDriveStorage.")

        try:
            creds_info = json.loads(creds_json)
            # Add required scopes for reading/writing files
            scopes = ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.metadata.readonly']
            credentials = service_account.Credentials.from_service_account_info(creds_info, scopes=scopes)
            self.service = build('drive', 'v3', credentials=credentials, cache_discovery=False)
        except Exception as e:
            raise ImproperlyConfigured(f"Failed to initialize Google Drive service: {e}")

    def _find_file_by_name(self, name):
        """Helper to find a file in the Drive folder by its Django name."""
        # Query scoped to the folder and the custom appProperty
        query = f"'{self.folder_id}' in parents and appProperties has {{ key='django_name' and value='{name}' }} and trashed=false"
        try:
            results = self.service.files().list(
                q=query,
                spaces='drive',
                fields='files(id, name, webViewLink)',
                pageSize=1
            ).execute()
            items = results.get('files', [])
            if not items:
                return None
            return items[0]
        except Exception as e:
            # If the API fails, it's safer to pretend the file wasn't found 
            # or bubble up the error. We bubble it up to prevent silent failures.
            import logging
            logging.error(f"Google Drive API error looking up '{name}': {e}")
            return None

    def _save(self, name, content):
        """Uploads the file and saves the relative name as an appProperty."""
        # Clean up path separators
        clean_name = name.replace('\\', '/')
        file_metadata = {
            'name': os.path.basename(clean_name),
            'parents': [self.folder_id],
            'appProperties': {
                'django_name': clean_name
            }
        }

        # content is a django.core.files.File object
        content.open('rb')
        media = MediaIoBaseUpload(content, mimetype=getattr(content, 'content_type', 'application/octet-stream'), resumable=True)

        try:
            file = self.service.files().create(
                body=file_metadata,
                media_body=media,
                fields='id, webViewLink'
            ).execute()
            
            # Cache the new URL and existence
            self._url_cache[clean_name] = file.get('webViewLink')
            self._exists_cache[clean_name] = True
            
            return clean_name
        except Exception as e:
            import logging
            logging.error(f"Google Drive API error uploading '{clean_name}': {e}")
            raise IOError(f"Could not save file {clean_name} to Google Drive.") from e
        finally:
            content.close()

    def exists(self, name):
        """Checks if a file with this Django name already exists in the Drive folder."""
        clean_name = name.replace('\\', '/')
        if clean_name in self._exists_cache:
            return self._exists_cache[clean_name]

        file_obj = self._find_file_by_name(clean_name)
        exists = file_obj is not None
        
        self._exists_cache[clean_name] = exists
        if file_obj:
            self._url_cache[clean_name] = file_obj.get('webViewLink')
            
        return exists

    def url(self, name):
        """Returns the Google Drive webViewLink for the file."""
        clean_name = name.replace('\\', '/')
        if clean_name in self._url_cache:
            return self._url_cache[clean_name]

        file_obj = self._find_file_by_name(clean_name)
        if file_obj and file_obj.get('webViewLink'):
            url = file_obj.get('webViewLink')
            self._url_cache[clean_name] = url
            self._exists_cache[clean_name] = True
            return url
            
        # If not found, return empty or raise an error.
        # Returning a placeholder or the raw name is safer so the admin page doesn't crash completely.
        return ""

    def delete(self, name):
        """Deletes the file from Google Drive if it exists."""
        clean_name = name.replace('\\', '/')
        file_obj = self._find_file_by_name(clean_name)
        if file_obj:
            file_id = file_obj.get('id')
            try:
                self.service.files().delete(fileId=file_id).execute()
                # Clear from cache
                self._url_cache.pop(clean_name, None)
                self._exists_cache[clean_name] = False
            except Exception as e:
                import logging
                logging.error(f"Google Drive API error deleting '{clean_name}': {e}")
