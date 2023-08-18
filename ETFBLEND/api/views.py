from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .models import ETFInformation
from .serializers import ETFInformationSerializer

# Create your views here.

class ETFInformationView(generics.ListAPIView):
    queryset = ETFInformation.objects.all()
    serializer_class = ETFInformationSerializer