from django.urls import path
from .views import ETFInformationView, CreateETFView, BlendView, ETFTickerList


urlpatterns = [
    path('home', ETFInformationView.as_view()),
    path('addETF', CreateETFView.as_view()),
    path('blend', BlendView.as_view()),
    path('etfList', ETFTickerList.as_view())
]