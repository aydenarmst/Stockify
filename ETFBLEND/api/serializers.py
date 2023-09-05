from rest_framework import serializers
from .models import ETFInformation, ETFHolding
from decimal import Decimal

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

class ETFBlendedHoldingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ETFHolding
        fields = ('ticker', 'name', 'sector', 'asset_class', 'weight', 'price')




class ETFBlendedHoldingsSerializer(serializers.Serializer):
    ticker = serializers.CharField()
    name = serializers.CharField()
    sector = serializers.CharField()
    asset_class = serializers.CharField()
    weight = serializers.DecimalField(max_digits=10, decimal_places=3)  # Define the field as Decimal
    price = serializers.CharField()

    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.update({'weight': f"{data['weight']}%"})
        data.update({'price': f"${data['price']}"})
        return data








# # Blend
# class BlendSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Blend
#         fields = ('ETFTickers', 'code', 'host', 'created_at')
