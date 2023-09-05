from django.db import models
import string
import random
from django.db.models import Count, Sum
from collections import defaultdict
from django.db.models import Sum, F
from decimal import Decimal


# ETF information


class ETFInformation(models.Model):
    ticker = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=150)
    expense_ratio = models.FloatField(max_length=5)

# ETF holdings


class ETFHolding(models.Model):
    etf = models.ForeignKey(ETFInformation, on_delete=models.CASCADE)
    ticker = models.CharField(max_length=20)
    name = models.CharField(max_length=100)
    sector = models.CharField(max_length=100)
    asset_class = models.CharField(max_length=100)
    market_value = models.CharField(max_length=100)
    weight = models.CharField(max_length=100)
    notional_value = models.CharField(max_length=100)
    shares = models.CharField(max_length=100)
    cusip = models.CharField(max_length=20)
    isin = models.CharField(max_length=20)
    sedol = models.CharField(max_length=20)
    price = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    exchange = models.CharField(max_length=100)
    currency = models.CharField(max_length=100)
    fx_rate = models.CharField(max_length=100)
    maturity = models.CharField(max_length=100)

    @staticmethod
    def get_overlapping_holdings(ETFInformationTickers):
        ETF_list = ETFInformation.objects.filter(
            ticker__in=ETFInformationTickers)

        # Find duplicate tickers in the ETFs from the ETF_list
        duplicate_tickers = ETFHolding.objects \
            .filter(etf__in=ETF_list) \
            .values('ticker') \
            .annotate(etf_count=Count('etf', distinct=True)) \
            .filter(etf_count__gte=2) \
            .values_list('ticker', flat=True)

        # Get the original holdings that match the duplicate tickers
        original_holdings = ETFHolding.objects.filter(
            ticker__in=duplicate_tickers, etf__in=ETF_list)

        # Create a dictionary to store 'price' for each 'ticker'
        ticker_prices = dict()
        for holding in original_holdings:
            ticker_prices[holding.ticker] = holding.price

        # Annotate the count of common ETFs for each holding
        overlapping_holdings = original_holdings \
            .values('ticker', 'name', 'sector', 'asset_class') \
            .annotate(total_weight=Sum(F('weight'))) \
            .order_by('-total_weight')  # Sort in descending order of total weight

        # Calculate the total weight of all overlapping holdings
        total_weight = sum(Decimal(holding['total_weight'])
                           for holding in overlapping_holdings)

        print(total_weight)

        # Normalize the weights to sum up to 100% and include 'price'
        normalized_holdings = []
        for holding in overlapping_holdings:
            weight = round(
                Decimal(holding['total_weight']) / total_weight * 100, 3)
            price = ticker_prices.get(holding['ticker'], None)
            if price is not None:
                price = round(Decimal(price), 2)  # Round price to 2 decimal places
            normalized_holdings.append({
                'ticker': holding['ticker'],
                'name': holding['name'],
                'sector': holding['sector'],
                'asset_class': holding['asset_class'],
                'weight': weight,
                'price': price
            })


        top_20 = normalized_holdings[:20]

        # Print the normalized holdings
        for holding in normalized_holdings:
            print(f"{holding['ticker']}: {holding['weight']}")

        return top_20
