from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .models import ETFInformation, ETFHolding
from .serializers import ETFInformationSerializer, CreateETFSerializer, ETFHoldingsSerializer, BlendedETFSummarySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from .utils import parse_csv_data

# Create your views here.


class ETFInformationView(generics.ListAPIView):
    queryset = ETFInformation.objects.all()
    serializer_class = ETFInformationSerializer


class ETFHoldingsView(generics.ListAPIView):
    queryset = ETFHolding.objects.all()
    serializer_class = ETFHoldingsSerializer


class CreateETFView(APIView):
    serializer_class = CreateETFSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            ticker = serializer.data.get('ticker')
            name = serializer.data.get('name')
            aum = serializer.data.get('AUM')
            expense_ratio = serializer.data.get('expense_ratio')
            inception_date = serializer.data.get('inception_date')
            lei = serializer.data.get('LEI')
            host = self.request.session.session_key

            queryset = ETFInformation.objects.filter(host=host)
            if queryset.exists():
                create = queryset[0]
                create.ticker = ticker
                create.name = name
                create.AUM = aum
                create.expense_ratio = expense_ratio
                create.inception_date = inception_date
                create.LEI = lei
                create.save(update_fields=[
                            'ticker', 'name', 'AUM', 'expense_ratio', 'inception_date', 'LEI'])
            else:
                etf = ETFInformation(ticker=ticker, name=name, AUM=aum, expense_ratio=expense_ratio,
                                     inception_date=inception_date, LEI=lei, host=host)
                etf.save()

                return Response(ETFInformationSerializer(etf).data, status=status.HTTP_201_CREATED)


class ETFTickerList(APIView):
    csv_data = parse_csv_data('data/ishares-etf-index.csv')

    def get(self, request, format=None):
        return Response(self.csv_data, status=status.HTTP_200_OK)


class ETFHoldingsView(generics.ListAPIView):
    def get(self, request, format=None):
        etf_tickers = self.request.GET.getlist('etf_tickers', [])

        # Get the queryset and sector exposure
        top_holdings, sector_exposure_dict = ETFHolding.get_overlapping_holdings(etf_tickers)

        # Transform sector exposure into a list of dictionaries suitable for serialization
        sector_exposure_list = [{'sector': k, 'weight': v} for k, v in sector_exposure_dict.items()]

        # Wrap the data in a dictionary
        summary_data = {
            'top_holdings': top_holdings,
            'sector_exposure': sector_exposure_list
        }

        # Serialize the data using BlendedETFSummarySerializer
        serializer = BlendedETFSummarySerializer(data=summary_data)
        
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

