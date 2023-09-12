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



# Serializer for individual blended holdings
class ETFBlendedHoldingsSerializer(serializers.Serializer):
    ticker = serializers.CharField()
    name = serializers.CharField()
    sector = serializers.CharField()
    asset_class = serializers.CharField()
    location = serializers.CharField()
    weight = serializers.DecimalField(max_digits=10, decimal_places=3)  # Define the field as Decimal
    price = serializers.CharField()
    etf_count = serializers.IntegerField()

# Serializer for sector exposure
class SectorExposureSerializer(serializers.Serializer):
    sector = serializers.CharField()
    weight = serializers.DecimalField(max_digits=10, decimal_places=2)


# Parent serializer that includes both the blended holdings and the sector exposure
class BlendedETFSummarySerializer(serializers.Serializer):
    top_holdings = ETFBlendedHoldingsSerializer(many=True)
    sector_exposure = SectorExposureSerializer(many=True)
    expense_ratio = serializers.DecimalField(max_digits=10, decimal_places=3)


class OverlapDataSerializer(serializers.Serializer):
    ticker = serializers.CharField()
    total_weight = serializers.DecimalField(max_digits=15, decimal_places=10)
    etf_weights = serializers.DictField(child=serializers.DecimalField(max_digits=15, decimal_places=3))
    sector = serializers.CharField()

class OverlapOutputSerializer(serializers.Serializer):
    overlap_data = OverlapDataSerializer(many=True)
    overlap_count = serializers.IntegerField()
    sector_exposure = SectorExposureSerializer(many=True)

