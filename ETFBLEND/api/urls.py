from django.urls import path
from django.contrib import admin
from .views import ETFInformationView, ETFHoldingsView, CreateETFView, ETFTickerList, OverlapView, RoutesView, MyTokenObtainPairView


from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('', RoutesView.as_view()),

    path('home', ETFInformationView.as_view()),
    path('addETF', CreateETFView.as_view()),
    path('etfList', ETFTickerList.as_view()),

    path('etf-holdings/', ETFHoldingsView.as_view(), name='etf-holdings'),
    path('overlap/', OverlapView.as_view(), name='etf-overlap'),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(), name='token_refresh'),
]
