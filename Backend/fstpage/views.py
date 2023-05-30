from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import PredictResultSerializer

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

def validate_data(height, weight, days):
    if height <= 0 or weight <= 0 or days <- 0:
        raise ValueError("키와 몸무게, 일수는 양수이어야 합니다.")

class PredictResultAPIView(APIView):
    def post(self,request):
        # CSV 파일 경로
        csv_file_path = 'fstpage/baby_growth_df.csv'
        # CSV 파일을 데이터 프레임으로 로드
        baby_growth_df = pd.read_csv(csv_file_path)        
        
        #babycare 앱에서 데이터 받아옴
        height = float(request.data.get('height'))
        weight = float(request.data.get('weight'))
        gender = str(request.data.get('gender'))
        days = float(request.data.get('days'))  
        
        try:
            validate_data(height, weight, days)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        if gender == "female":
            gender = 0.0
        elif gender == "male":
            gender = 1.0 
        else:
            raise ValidationError('Invalid gender')#모델 사용 위해 float형으로 변경    
            
        # 입력값을 DataFrame으로 변환
        input_data = {'days': [days], 'height': [height], 'weight': [weight], 'gender': [gender]}
        df = pd.DataFrame(input_data)

        # DataFrame을 기존 데이터에 추가
        baby_growth_df = pd.concat([baby_growth_df, df], ignore_index=True)

        baby_growth_df.to_csv(csv_file_path, index=False)
        #height 예측 모델링
        # 독립 변수와 종속 변수 분리
        
        filtered_df = baby_growth_df[baby_growth_df['gender'] == gender]

        # 키에 대한 예측 모델 학습
        height_X = filtered_df['days'].values.reshape(-1, 1)
        height_y = filtered_df['height'].values

        # 데이터 분할
        # height_X_train, height_X_test, height_y_train, height_y_test = train_test_split(height_X, height_y, test_size=0.2, random_state=42)

        height_model = LinearRegression()
        height_model.fit(height_X, height_y)

        # 몸무게에 대한 예측 모델 학습
        weight_X = filtered_df['days'].values.reshape(-1, 1)
        weight_y = filtered_df['weight'].values

        # 데이터 분할
        # weight_X_train, weight_X_test, weight_y_train, weight_y_test = train_test_split(weight_X, weight_y, test_size=0.2, random_state=42)

        weight_model = LinearRegression()
        weight_model.fit(weight_X, weight_y)
        
        prediction_range = range(1, 181)

        predicted_heights = []

        # 입력한 일 수에 대한 예측값 계산
        predicted_height = height_model.predict([[days]])

        if height > predicted_height:
            slope_height = height_model.coef_[0]
            for i in prediction_range:
                prediction_days = days + i
                predicted_height_sync = slope_height * prediction_days + (height_model.intercept_ + (height - predicted_height))
                predicted_heights.append(predicted_height_sync)
        else:
            slope_height = height_model.coef_[0]
            for i in prediction_range:
                prediction_days = days + i
                predicted_height_sync = slope_height * prediction_days + (height_model.intercept_ - (predicted_height - height))
                predicted_heights.append(predicted_height_sync)
                
        predicted_heights_val = []
        for i in range(len(predicted_heights)):
            predicted_heights_val.append(round(predicted_heights[i][0],2))
            
        prediction_range = range(1, 181)

        # 예측 결과를 저장할 리스트 초기화
        predicted_weights = []

        # 입력한 일 수에 대한 예측값 계산
        predicted_weight = weight_model.predict([[days]])


        if weight> predicted_weight:
            slope_weight = weight_model.coef_[0]
            for i in prediction_range:
                prediction_days = days + i
                predicted_weight_sync = slope_weight * prediction_days + (weight_model.intercept_ + (weight- predicted_weight))
                predicted_weights.append(predicted_weight_sync)
        else:
            slope_weight = weight_model.coef_[0]
            for i in prediction_range:
                prediction_days = days + i
                predicted_weight_sync = slope_weight * prediction_days + (weight_model.intercept_ - (predicted_weight - weight))
                predicted_weights.append(predicted_weight_sync)
                
        predicted_weights_val = []
        for i in range(len(predicted_weights)):
            predicted_weights_val.append(round(predicted_weights[i][0],2))
            
        result = {
            'gender': gender,
            'days': days,
            'one_month_pred_height': predicted_heights_val[29], #cm
            'three_month_pred_height': predicted_heights_val[89], #cm
            'six_month_pred_height': predicted_heights_val[179], #cm
            'one_month_pred_weight': predicted_weights_val[29], #kg
            'three_month_pred_weight': predicted_weights_val[89], #kg
            'six_month_pred_weight': predicted_weights_val[179], #kg
            'graph_height': predicted_heights_val,
            'graph_weight': predicted_weights_val,
            'height': height,
            'weight': weight,
        }
        
        serializer = PredictResultSerializer(data=result)
        
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

    def get(self, request):
        return Response({'detail': 'Method Not Allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def put(self, request):
        return Response({'detail': 'Method Not Allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def delete(self, request):
        return Response({'detail': 'Method Not Allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)