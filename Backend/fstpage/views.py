from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import pandas as pd
import numpy as np

'''class PredictResultAPIView(APIView):
    def post(self,request):
        '''