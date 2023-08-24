from django.urls import path
from .views import ETFInformationView, CreateETFView


urlpatterns = [
    path('home', ETFInformationView.as_view()),
    path('addETF', CreateETFView.as_view()),
]