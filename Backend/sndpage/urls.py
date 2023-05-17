from django.urls import path
from .views import CalculateResultAPIView

app_name = 'sndpage'
urlpatterns = [
    path('api/calculate/', CalculateResultAPIView.as_view(), name='calculate'),
]
