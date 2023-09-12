from django.urls import path
from .views import index
import django.contrib.admin


urlpatterns = [
    path('', index),
    path('overlap', index),
    path('blend', index),
    path('terms', index),
]
