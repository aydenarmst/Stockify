from django.db import models
import string
import random
from django.db.models import Count, Sum
from collections import defaultdict
from django.db.models import Sum, F
from decimal import Decimal
from django.contrib.auth.models import AbstractUser


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


# class CustomUser(AbstractUser):
#     pass

#     def __str__(self):
#         return self.username