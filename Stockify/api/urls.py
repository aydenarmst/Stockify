from django.urls import path
from django.contrib import admin
from .views import ETFInformationView, ETFHoldingsView, CreateETFView, ETFTickerList, OverlapView


from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView,
)


urlpatterns = [
    path('', ETFInformationView.as_view()),

    path('home', ETFInformationView.as_view()),
    path('addETF', CreateETFView.as_view()),
    path('etfList', ETFTickerList.as_view()),

    path('etf-holdings/', ETFHoldingsView.as_view(), name='etf-holdings'),
    path('overlap/', OverlapView.as_view(), name='etf-overlap'),
]
