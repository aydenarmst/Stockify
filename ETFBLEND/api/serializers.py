from rest_framework import serializers
from .models import ETFInformation, Blend, ETFHolding


# ETF information
class ETFInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ETFInformation
        fields = ('ticker', 'name', 'url', 'expense_ratio')


class CreateETFSerializer(serializers.ModelSerializer):
    class Meta:
        model = ETFInformation
        fields = ('ticker', 'name', 'AUM',
                  'expense_ratio', 'inception_date', 'LEI')

# Holdings


class ETFHoldingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ETFHolding
        fields = ('etf', 'ticker', 'name', 'sector', 'asset_class', 'market_value', 'weight', 'notional_value',
                  'shares', 'cusip', 'isin', 'sedol', 'price', 'location', 'exchange', 'currency', 'fx_rate', 'maturity')


# Blend
class BlendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blend
        fields = ('ETFTickers', 'code', 'host', 'created_at')
