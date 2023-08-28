from rest_framework import serializers
from .models import ETFInformation, Blend


# ETF information
class ETFInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ETFInformation
        fields = ('ticker', 'name', 'AUM', 'expense_ratio', 'inception_date', 'LEI')

class CreateETFSerializer(serializers.ModelSerializer):
    class Meta:
        model = ETFInformation
        fields = ('ticker', 'name', 'AUM', 'expense_ratio', 'inception_date', 'LEI')

# Holdings
class ETFHoldingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ETFInformation
        fields = ('ticker', 'name', 'AUM', 'expense_ratio', 'inception_date', 'LEI')
    


# Blend
class BlendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blend
        fields = ('ETFTickers','code', 'host', 'created_at')

