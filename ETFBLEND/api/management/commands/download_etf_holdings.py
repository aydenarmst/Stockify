# yourapp/management/commands/download_etf_holdings.py

from django.core.management.base import BaseCommand
from api.web_scrape.ishares_scraper import download_and_save_etf_holdings

class Command(BaseCommand):
    help = 'Downloads and saves ETF holdings'

    def handle(self, *args, **options):
        download_and_save_etf_holdings()
        self.stdout.write(self.style.SUCCESS('Successfully downloaded and saved ETF holdings'))
