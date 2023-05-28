from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.serializers import Serializer

# Import the ResultSerializer
from .serializers import ResultSerializer

import pandas as pd
import numpy as np

class CalculateResultAPIView(APIView):
    def post(self,request):
        # CSV 파일 경로
        csv_file_path = 'sndpage/baby_growth_df.csv'
        # CSV 파일을 데이터 프레임으로 로드
        baby_growth_df = pd.read_csv(csv_file_path)
        
        #babycare 앱에서 POST로 전달된 데이터 받아옴
        height = float(request.data.get('height'))
        weight = float(request.data.get('weight'))
        gender = str(request.data.get('gender'))
        days = float(request.data.get('days'))
            
        if gender == "female":
            gender = 0.0
        elif gender == "male":
            gender = 1.0
        #모델 사용 위해 float형으로 변경
        else:
            print("cannot use data")
        
        compare_df = baby_growth_df[(baby_growth_df['gender'] == gender) & (baby_growth_df['days'] == days)]
        #생후일수와 성별이 동일한 아이들의 집합 데이터 프레임 

        # 입력값을 DataFrame으로 변환
        input_data = {'days': [days], 'height': [height], 'weight': [weight], 'gender': [gender]}
        df = pd.DataFrame(input_data)

        # DataFrame을 기존 데이터에 추가
        baby_growth_df = pd.concat([baby_growth_df, df], ignore_index=True)

        baby_growth_df.to_csv(csv_file_path, index=False)

        idx = 0 

        #std 
        std_height_male = [49.9, 54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72.0, 73.3, 74.5, 75.7]
        std_height_female = [49.1, 53.7, 57.1, 59.8, 62.1, 64.0, 65.7, 67.3, 68.7, 70.1, 71.5, 72.8, 74.0]
        std_weight_male = [3.3, 4.5, 5.6, 6.4, 7.0, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6]
        std_weight_female = [3.2, 4.2, 5.1, 5.8, 6.4, 6.9, 7.3, 7.6, 7.9, 8.2, 8.5, 8.7, 8.9]

        if not compare_df.empty:
            height_rank = (compare_df['height'] > height).sum() + 1
            weight_rank = (compare_df['weight'] > weight).sum() + 1

            height_percent = round((height_rank / (len(compare_df)+1))*100, 2)
            weight_percent = round((weight_rank /(len(compare_df)+1))*100, 2)
            
            #match_std_month
            if 0 <= days < 30 :
                idx = 0
            elif 30 <= days < 60 :
                idx = 1
            elif 60 <= days < 90 :
                idx = 2
            elif 90 <= days < 120 :
                idx = 3
            elif 120 <= days < 150 :
                idx = 4
            elif 150 <= days < 180 :
                idx = 5
            elif 180 <= days < 210 :
                idx = 6
            elif 210 <= days < 240 :
                idx = 7
            elif 240 <= days < 270 :
                idx = 8
            elif 270 <= days < 300 :
                idx = 9
            elif 300 <= days < 330 :
                idx = 10
            elif 330 <= days < 360 :
                idx = 11
            else :
                idx = 12
                
            if gender == 0.0 :
                plot_std_height = std_height_female[idx]
                plot_std_weight = std_weight_female[idx]
                plot_data_mean_height = compare_df['height'].mean()
                plot_data_mean_weight = compare_df['weight'].mean()
            elif gender == 1.0 :
                plot_std_height = std_height_male[idx]
                plot_std_weight = std_weight_male[idx]
                plot_data_mean_height = compare_df['height'].mean()
                plot_data_mean_weight = compare_df['weight'].mean()  
            
            result = {
                'gender': gender,
                'days': days,
                'height_percent': height_percent,
                'weight_percent': weight_percent,
                'plot_std_height': plot_std_height,
                'plot_std_weight': plot_std_weight,
                'plot_data_mean_height': plot_data_mean_height,
                'plot_data_mean_weight': plot_data_mean_weight,
                'height': height,
                'weight': weight,
            }   

            serializer = ResultSerializer(data=result)
            
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'No data found.'}, status=status.HTTP_404_NOT_FOUND)
        
        

    def get(self, request):
        return Response({'detail': 'Method Not Allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def put(self, request):
        return Response({'detail': 'Method Not Allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def delete(self, request):
        return Response({'detail': 'Method Not Allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)