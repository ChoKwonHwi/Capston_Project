from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import pandas as pd
import numpy as np

class CalculateResultAPIView(APIView):
    def post(self,request):
        # CSV 파일 경로
        csv_file_path = 'sndpage/baby_growth_df.csv'
        # CSV 파일을 데이터 프레임으로 로드
        baby_growth_df = pd.read_csv(csv_file_path)
        
        #babycare 앱에서 POST로 전달된 데이터 받아옴
        height = request.data.get('height')
        weight = request.data.get('weight')
        gender = request.data.get('gender')
        days = request.data.get('days')
        
        compare_df = baby_growth_df[(baby_growth_df['gender'] == gender) 
                                    & (baby_growth_df['days'] == days)]
        #생후일수와 성별이 동일한 아이들의 집합 데이터 프레임 

        if not compare_df.empty:
            height_rank = (compare_df['height'] > height).sum() + 1
            weight_rank = (compare_df['weight'] > weight).sum() + 1

            height_percent = round((height_rank / len(compare_df)) * 100, 2)
            weight_percent = round((weight_rank / len(compare_df)) * 100, 2)

            result = {
                'height_percent': height_percent,
                'weight_percent': weight_percent
            }

            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'No data found.'}, status=status.HTTP_404_NOT_FOUND)