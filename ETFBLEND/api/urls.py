from django.urls import path
from .views import ETFInformationView


urlpatterns = [
    path('home', ETFInformationView.as_view()),
]