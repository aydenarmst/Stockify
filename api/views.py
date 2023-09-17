from .utils import parse_csv_data
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .models import ETFInformation, ETFHolding
from .serializers import ETFInformationSerializer, CreateETFSerializer, ETFHoldingsSerializer, BlendedETFSummarySerializer, OverlapOutputSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from .business_logic.blend_logic import get_overlapping_holdings
from .business_logic.overlap_logic import calculate_overlap
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

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
            expense_ratio = serializer.data.get('expense_ratio')
            lei = serializer.data.get('LEI')
            host = self.request.session.session_key

            queryset = ETFInformation.objects.filter(host=host)
            if queryset.exists():
                create = queryset[0]
                create.ticker = ticker
                create.name = name
                create.expense_ratio = expense_ratio
                create.save(update_fields=[
                            'ticker', 'name', 'expense_ratio'])
            else:
                etf = ETFInformation(ticker=ticker, name=name, expense_ratio=expense_ratio,
                                     LEI=lei, host=host)
                etf.save()

                return Response(ETFInformationSerializer(etf).data, status=status.HTTP_201_CREATED)


class ETFTickerList(APIView):
    csv_data = parse_csv_data('data/ishares-etf-index.csv')

    def get(self, request, format=None):
        return Response(self.csv_data, status=status.HTTP_200_OK)


class ETFHoldingsView(generics.ListAPIView):
    def get(self, request, format=None):
        etf_tickers = self.request.GET.getlist('etf_tickers', [])
        number_of_holdings = self.request.GET.get('number_of_holdings', None)

        if number_of_holdings is not None:
            try:
                number_of_holdings = int(number_of_holdings)
            except ValueError:
                return Response({"error": "number_of_holdings must be an integer"}, status=status.HTTP_400_BAD_REQUEST)

        # Get the queryset and sector exposure
        top_holdings, sector_exposure_dict, expense_ratio = get_overlapping_holdings(
            etf_tickers, number_of_holdings)

        # Transform sector exposure into a list of dictionaries suitable for serialization
        sector_exposure_list = [{'sector': k, 'weight': v}
                                for k, v in sector_exposure_dict.items()]

        # Wrap the data in a dictionary
        summary_data = {
            'top_holdings': top_holdings,
            'sector_exposure': sector_exposure_list,
            'expense_ratio': expense_ratio
        }

        # Serialize the data using BlendedETFSummarySerializer
        serializer = BlendedETFSummarySerializer(data=summary_data)

        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OverlapView(APIView):
    def get(self, request, format=None):
        # Fetching the 'etf' parameters from the request's query parameters
        etf_tuples = request.query_params.getlist('etf')

        # Splitting each tuple to get the ticker and weight
        etf_data = [tuple(etf.split(":")) for etf in etf_tuples]

        exclude_holdings = request.query_params.getlist('exclude')

        overlap_data, overlap_count, sector_exposure_dict = calculate_overlap(
            etf_data, exclude_holdings)

        # Transform sector exposure into a list of dictionaries suitable for serialization
        sector_exposure_list = [{'sector': k, 'weight': v}
                                for k, v in sector_exposure_dict.items()]

        # Constructing the data for the serializer
        response_data = {
            "overlap_data": overlap_data,
            "overlap_count": overlap_count,
            "sector_exposure": sector_exposure_list
        }

        serializer = OverlapOutputSerializer(data=response_data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
