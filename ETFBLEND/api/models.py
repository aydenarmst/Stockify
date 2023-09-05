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
        ETF_list = ETFInformation.objects.filter(ticker__in=ETFInformationTickers)
        
        duplicate_tickers = ETFHolding._get_duplicate_tickers(ETF_list)
        original_holdings = ETFHolding.objects.filter(ticker__in=duplicate_tickers, etf__in=ETF_list)

        ticker_prices = {holding.ticker: holding.price for holding in original_holdings}
        overlapping_holdings = ETFHolding._get_annotated_holdings(original_holdings)
        
        total_weight = sum(Decimal(holding['total_weight']) for holding in overlapping_holdings)
        normalized_holdings = ETFHolding._normalize_holdings(overlapping_holdings, total_weight, ticker_prices)

        return normalized_holdings[:20]

    @staticmethod
    def _get_duplicate_tickers(ETF_list):
        return ETFHolding.objects \
            .filter(etf__in=ETF_list) \
            .values('ticker') \
            .annotate(etf_count=Count('etf', distinct=True)) \
            .filter(etf_count__gte=2) \
            .values_list('ticker', flat=True)

    @staticmethod
    def _get_annotated_holdings(original_holdings):
        return original_holdings \
            .values('ticker', 'name', 'sector', 'asset_class') \
            .annotate(total_weight=Sum(F('weight'))) \
            .order_by('-total_weight')

    from decimal import Decimal

    @staticmethod
    def _normalize_holdings(overlapping_holdings, total_weight, ticker_prices):
        # Compute the sum of the weights for the top 20 holdings
        top_20_weight_sum = sum(Decimal(holding['total_weight']) for holding in overlapping_holdings[:20])
        
        normalized_holdings = []
        for holding in overlapping_holdings[:20]:  # Limit to the top 20 holdings
            # Normalize each weight based on the sum of the top 20
            normalized_weight = round((Decimal(holding['total_weight']) / top_20_weight_sum) * 100, 3)
            
            price = ticker_prices.get(holding['ticker'], None)
            if price is not None:
                price = round(Decimal(price), 2)
            
            normalized_holdings.append({
                'ticker': holding['ticker'],
                'name': holding['name'],
                'sector': holding['sector'],
                'asset_class': holding['asset_class'],
                'weight': normalized_weight,
                'price': price
            })
            
        return normalized_holdings

