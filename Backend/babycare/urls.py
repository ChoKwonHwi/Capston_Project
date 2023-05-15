from django.urls import path
from .views import UserDataView

urlpatterns = [
    path('api/users/', UserDataView.as_view(), name='user_api'),
]
