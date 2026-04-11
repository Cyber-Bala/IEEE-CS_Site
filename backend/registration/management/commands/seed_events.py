"""
Management command to seed the database with Xypher'26 event data.
Run with: python manage.py seed_events
"""
from django.core.management.base import BaseCommand
from registration.models import Event


XYPHER26_EVENTS = [
    {
        'name': 'Capture The Flag (CTF)',
        'slug': 'capture-the-flag',
        'description': 'A cybersecurity challenge where participants solve technical problems related to cryptography, web security, and forensics.',
        'event_type': 'ctf',
        'day': 1,
        'duration_hours': 6,
        'team_size_min': 3,
        'team_size_max': 4,
        'fee_ieee_member': 250,
        'fee_non_ieee': 300,
        'is_per_team': True,
        'prize_pool': 6000,
        'expected_teams': 20,
    },
    {
        'name': 'Building UI Blindfolded',
        'slug': 'building-ui-blindfolded',
        'description': 'A collaborative challenge where one teammate designs a UI and describes it verbally while the other codes it without seeing the design, testing communication and implementation accuracy.',
        'event_type': 'technical',
        'day': 1,
        'duration_hours': 3,
        'team_size_min': 2,
        'team_size_max': 2,
        'fee_ieee_member': 125,
        'fee_non_ieee': 175,
        'is_per_team': True,
        'prize_pool': 2500,
        'expected_teams': 20,
    },
    {
        'name': 'Project Expo',
        'slug': 'project-expo',
        'description': 'An exhibition platform where participants present innovative technical projects demonstrating practical applications.',
        'event_type': 'technical',
        'day': 1,
        'duration_hours': 3,
        'team_size_min': 1,
        'team_size_max': 4,
        'fee_ieee_member': 175,
        'fee_non_ieee': 150,
        'is_per_team': True,
        'prize_pool': 3000,
        'expected_teams': 20,
    },
    {
        'name': 'Data Visualization using Power BI (Workshop)',
        'slug': 'power-bi-workshop',
        'description': 'A hands-on workshop introducing participants to creating interactive dashboards and meaningful insights using Power BI.',
        'event_type': 'workshop',
        'day': 1,
        'duration_hours': 2,
        'team_size_min': 1,
        'team_size_max': 1,
        'fee_ieee_member': 0,
        'fee_non_ieee': 50,
        'is_per_team': False,
        'prize_pool': 0,
        'expected_teams': 150,
    },
    {
        'name': 'Mystery Tech Auction',
        'slug': 'mystery-tech-auction',
        'description': 'Teams are given a fixed amount of virtual money and must bid in an auction for tech resources like APIs, datasets, cloud credits, or tools; after the auction, they must build a project using only what they purchased, testing strategy, decision-making, and creativity under constraints.',
        'event_type': 'technical',
        'day': 2,
        'duration_hours': 6,
        'team_size_min': 2,
        'team_size_max': 3,
        'fee_ieee_member': 250,
        'fee_non_ieee': 300,
        'is_per_team': True,
        'prize_pool': 6000,
        'expected_teams': 15,
    },
    {
        'name': 'Technical Treasure Hunt',
        'slug': 'technical-treasure-hunt',
        'description': 'A problem-solving event where participants follow technical clues and puzzles to progress through multiple stages collaboratively.',
        'event_type': 'technical',
        'day': 2,
        'duration_hours': 3,
        'team_size_min': 2,
        'team_size_max': 3,
        'fee_ieee_member': 250,
        'fee_non_ieee': 300,
        'is_per_team': True,
        'prize_pool': 2500,
        'expected_teams': 15,
    },
    {
        'name': 'App Development',
        'slug': 'app-development',
        'description': 'An event focused on designing and developing functional applications that address real-world problems using technical skills.',
        'event_type': 'technical',
        'day': 2,
        'duration_hours': 3,
        'team_size_min': 2,
        'team_size_max': 3,
        'fee_ieee_member': 125,
        'fee_non_ieee': 175,
        'is_per_team': True,
        'prize_pool': 2500,
        'expected_teams': 20,
    },
    {
        'name': 'DevOps Workshop',
        'slug': 'devops-workshop',
        'description': 'A practical workshop introducing participants to DevOps concepts including integration and deployment workflows.',
        'event_type': 'workshop',
        'day': 2,
        'duration_hours': 2,
        'team_size_min': 1,
        'team_size_max': 1,
        'fee_ieee_member': 0,
        'fee_non_ieee': 50,
        'is_per_team': False,
        'prize_pool': 0,
        'expected_teams': 150,
    },
]


class Command(BaseCommand):
    help = 'Seed Xypher\'26 events into the database'

    def handle(self, *args, **options):
        for event_data in XYPHER26_EVENTS:
            event, created = Event.objects.update_or_create(
                slug=event_data['slug'],
                defaults=event_data
            )
            action = 'Created' if created else 'Updated'
            self.stdout.write(f'{action}: {event.name}')

        self.stdout.write(self.style.SUCCESS(f'\nDone! {len(XYPHER26_EVENTS)} events loaded.'))
