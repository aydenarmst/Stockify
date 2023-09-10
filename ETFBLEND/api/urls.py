from django.urls import path
from .views import ETFInformationView, CreateETFView, ETFTickerList, ETFHoldingsView, OverlapView


urlpatterns = [
    path('home', ETFInformationView.as_view()),
    path('addETF', CreateETFView.as_view()),
    path('etfList', ETFTickerList.as_view()),
    path('etf-holdings/', ETFHoldingsView.as_view(), name='etf-holdings'),
    path('overlap/', OverlapView.as_view(), name='etf-overlap'),
]
