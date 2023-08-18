from rest_framework import serializers
from .models import ETFInformation

class ETFInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ETFInformation
        fields = ('ticker', 'name', 'AUM', 'expense_ratio', 'inception_date', 'LEI')