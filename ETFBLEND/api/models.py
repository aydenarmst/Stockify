from django.db import models
import string
import random

def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Blend.objects.filter(code=code).count() == 0:
            break
    return code

# ETF information
class ETFInformation(models.Model):
    ticker = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=150)

# ETF holdings
class ETFHolding(models.Model):
    etf = models.ForeignKey(ETFInformation, on_delete=models.CASCADE)
    ticker = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    sector = models.CharField(max_length=100)
    asset_class = models.CharField(max_length=100)
    market_value = models.FloatField()
    weight = models.FloatField()
    notional_value = models.FloatField()
    shares = models.FloatField()
    cusip = models.CharField(max_length=10)
    isin = models.CharField(max_length=10)
    sedol = models.CharField(max_length=10)
    price = models.FloatField()
    location = models.CharField(max_length=100)
    exchange = models.CharField(max_length=100)
    currency = models.CharField(max_length=100)
    fx_rate = models.FloatField()
    maturity = models.DateField()

# Blend
class Blend(models.Model):
    code = models.CharField(max_length=10, unique=True, primary_key=True, default=generate_unique_code)
    host = models.CharField(max_length=50, unique=True)
    ETFTickers = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)