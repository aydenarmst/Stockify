from rest_framework import serializers
from .models import ETFInformation


# ETF information
class ETFInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ETFInformation
        fields = ('ticker', 'name', 'AUM', 'expense_ratio', 'inception_date', 'LEI')

class CreateETFSerializer(serializers.ModelSerializer):
    class Meta:
        model = ETFInformation
        fields = ('ticker', 'name', 'AUM', 'expense_ratio', 'inception_date', 'LEI')


# ETF holdings
class ETFHoldingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ETFInformation
        fields = ('etf', 'ticker', 'name', 'weight', 'shares')

class CreateETFHoldingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ETFInformation
        fields = ('etf', 'ticker', 'name', 'weight', 'shares')