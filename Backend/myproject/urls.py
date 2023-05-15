from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('babycare/', include('babycare.urls')), #main page
    path('fstpage/', include('fstpage.urls')), #fst page
    path('sndpage/', include('sndpage.urls')), #snd page
    ]
