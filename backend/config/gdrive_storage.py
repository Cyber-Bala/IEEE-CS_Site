import os
import logging
from django.core.files.storage import Storage
from django.core.exceptions import ImproperlyConfigured
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload

logger = logging.getLogger(__name__)

# Google Drive API scope — drive.file gives access only to files
# created or opened by this app. We also need broader read for
# listing files in the folder.
SCOPES = ['https://www.googleapis.com/auth/drive']


class GoogleDriveStorage(Storage):
    """
    Custom Django Storage backend that uploads media files to a Google
    Drive folder using OAuth 2.0 credentials (refresh token flow).

    Files are uploaded under the storage quota of the Google account
    that authorised the OAuth token, NOT a Service Account.

    Django relative file names (e.g. iccds2026/<uuid>/<hash>.pdf) are
    stored in the Google Drive file's appProperties so they can be
    looked up later without changing the database schema.
    """

    def __init__(self):
        super().__init__()
        self._setup()
        # Per-instance caches to avoid redundant API calls within a
        # single request / admin page load.
        self._url_cache = {}
        self._exists_cache = {}

    # ── Authentication & Initialisation ─────────────────────────────

    def _setup(self):
        self.folder_id = os.getenv('GOOGLE_DRIVE_FOLDER_ID')
        client_id = os.getenv('GOOGLE_OAUTH_CLIENT_ID')
        client_secret = os.getenv('GOOGLE_OAUTH_CLIENT_SECRET')
        refresh_token = os.getenv('GOOGLE_OAUTH_REFRESH_TOKEN')

        # Validate required environment variables
        missing = []
        if not self.folder_id:
            missing.append('GOOGLE_DRIVE_FOLDER_ID')
        if not client_id:
            missing.append('GOOGLE_OAUTH_CLIENT_ID')
        if not client_secret:
            missing.append('GOOGLE_OAUTH_CLIENT_SECRET')
        if not refresh_token:
            missing.append('GOOGLE_OAUTH_REFRESH_TOKEN')

        if missing:
            raise ImproperlyConfigured(
                f"GoogleDriveStorage requires the following environment "
                f"variables: {', '.join(missing)}"
            )

        try:
            credentials = Credentials(
                token=None,
                refresh_token=refresh_token,
                client_id=client_id,
                client_secret=client_secret,
                token_uri='https://oauth2.googleapis.com/token',
                scopes=SCOPES,
            )
            # Force an initial token refresh so we fail fast on bad
            # credentials rather than during the first user upload.
            credentials.refresh(Request())

            self.service = build(
                'drive', 'v3',
                credentials=credentials,
                cache_discovery=False,
            )

            # Verify the folder is accessible
            try:
                self.service.files().get(
                    fileId=self.folder_id, fields='id'
                ).execute()
            except Exception:
                logger.error(
                    "Google Drive folder %s is inaccessible. "
                    "Verify the folder exists and is owned by or shared "
                    "with the OAuth account.",
                    self.folder_id,
                )
                raise ImproperlyConfigured(
                    "The configured Google Drive folder is inaccessible. "
                    "Check GOOGLE_DRIVE_FOLDER_ID and account permissions."
                )

        except ImproperlyConfigured:
            raise
        except Exception as e:
            logger.error(
                "Failed to initialise Google Drive OAuth credentials. "
                "Verify GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, "
                "and GOOGLE_OAUTH_REFRESH_TOKEN. Error type: %s",
                type(e).__name__,
            )
            raise ImproperlyConfigured(
                "Failed to initialise Google Drive service. "
                "Check OAuth credential environment variables."
            ) from e

    # ── Internal helpers ────────────────────────────────────────────

    def _find_file_by_name(self, name):
        """Find a file inside the target folder by its Django storage name."""
        query = (
            f"'{self.folder_id}' in parents and "
            f"appProperties has {{ key='django_name' and value='{name}' }} and "
            f"trashed=false"
        )
        try:
            results = self.service.files().list(
                q=query,
                spaces='drive',
                fields='files(id, name, webViewLink)',
                pageSize=1,
            ).execute()
            items = results.get('files', [])
            return items[0] if items else None
        except Exception as e:
            logger.error(
                "Google Drive API error looking up '%s': %s",
                name, type(e).__name__,
            )
            return None

    # ── Django Storage API ──────────────────────────────────────────

    def _open(self, name, mode='rb'):
        """Open the file from Google Drive and return a binary file-like object."""
        if mode != 'rb':
            raise ValueError("GoogleDriveStorage only supports 'rb' mode for reading.")

        clean_name = name.replace('\\', '/')
        file_obj = self._find_file_by_name(clean_name)
        if not file_obj:
            raise FileNotFoundError(f"File '{clean_name}' not found in Google Drive.")

        file_id = file_obj['id']
        try:
            import io
            from django.core.files.base import File
            from googleapiclient.http import MediaIoBaseDownload

            request = self.service.files().get_media(fileId=file_id)
            fh = io.BytesIO()
            downloader = MediaIoBaseDownload(fh, request)
            done = False
            while done is False:
                status, done = downloader.next_chunk()
            
            fh.seek(0)
            return File(fh, name=clean_name)
        except Exception as e:
            logger.error(
                "Google Drive API error downloading '%s': %s",
                clean_name, type(e).__name__,
            )
            raise IOError(f"Could not read file {clean_name} from Google Drive.") from e

    def _save(self, name, content):
        """Upload file to Google Drive; return the Django storage name."""
        clean_name = name.replace('\\', '/')
        file_metadata = {
            'name': os.path.basename(clean_name),
            'parents': [self.folder_id],
            'appProperties': {
                'django_name': clean_name,
            },
        }

        content.open('rb')
        # Extract the raw file-like object so MediaIoBaseUpload works
        # with both InMemoryUploadedFile (BytesIO) and
        # TemporaryUploadedFile (real file on disk).
        fd = content.file if hasattr(content, 'file') else content
        mime_type = getattr(content, 'content_type', 'application/octet-stream')
        media = MediaIoBaseUpload(fd, mimetype=mime_type, resumable=False)

        try:
            uploaded = self.service.files().create(
                body=file_metadata,
                media_body=media,
                fields='id, webViewLink',
            ).execute()

            self._url_cache[clean_name] = uploaded.get('webViewLink')
            self._exists_cache[clean_name] = True

            logger.info(
                "Google Drive upload succeeded for '%s' (Drive ID: %s)",
                clean_name, uploaded.get('id'),
            )
            return clean_name

        except Exception as e:
            logger.error(
                "Google Drive upload failed for '%s': %s",
                clean_name, type(e).__name__,
            )
            raise IOError(
                f"Could not save file {clean_name} to Google Drive."
            ) from e
        finally:
            content.close()

    def exists(self, name):
        """Check whether a file with this Django name exists in Drive."""
        clean_name = name.replace('\\', '/')
        if clean_name in self._exists_cache:
            return self._exists_cache[clean_name]

        file_obj = self._find_file_by_name(clean_name)
        found = file_obj is not None

        self._exists_cache[clean_name] = found
        if file_obj:
            self._url_cache[clean_name] = file_obj.get('webViewLink')

        return found

    def url(self, name):
        """
        File URLs are intentionally hidden to enforce the secure proxy view.
        Direct Google Drive URLs are never exposed to the frontend or admin HTML.
        """
        # We must return a string to satisfy Django's FileField widget, 
        # but we return a generic placeholder instead of the Drive link.
        return "#secure-file-access-only"

    def delete(self, name):
        """Delete the file from Google Drive if it exists."""
        clean_name = name.replace('\\', '/')
        file_obj = self._find_file_by_name(clean_name)
        if file_obj:
            file_id = file_obj['id']
            try:
                self.service.files().delete(fileId=file_id).execute()
                self._url_cache.pop(clean_name, None)
                self._exists_cache[clean_name] = False
                logger.info(
                    "Google Drive delete succeeded for '%s' (Drive ID: %s)",
                    clean_name, file_id,
                )
            except Exception as e:
                logger.error(
                    "Google Drive delete failed for '%s': %s",
                    clean_name, type(e).__name__,
                )
