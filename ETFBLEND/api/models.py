from django.db import models
import string
import random

def generate_unique_code():
    length = 10
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if ETFInformation.objects.filter(LEI=code).count() == 0:
            break

# Create your models here.
class ETFInformation(models.Model):
    ticker = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    AUM = models.FloatField()
    expense_ratio = models.FloatField()
    inception_date = models.DateField()
    LEI = models.CharField(max_length=20, unique=True, primary_key=True, default=generate_unique_code)

