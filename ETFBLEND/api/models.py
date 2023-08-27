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
    host = models.CharField(max_length=50, unique=True)
    ticker = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    AUM = models.FloatField()
    expense_ratio = models.FloatField()
    inception_date = models.DateField()
    LEI = models.CharField(max_length=20, unique=True, primary_key=True, default=generate_unique_code)

# ETF holdings
class ETFHoldings(models.Model):
    etf = models.ForeignKey(ETFInformation, on_delete=models.CASCADE)
    ticker = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    weight = models.FloatField()
    shares = models.FloatField()

# Blend
class Blend(models.Model):
    code = models.CharField(max_length=10, unique=True, primary_key=True, default=generate_unique_code)
    host = models.CharField(max_length=50, unique=True)
    ETFTickers = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)