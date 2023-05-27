from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import PredictResultSerializer

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

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
        
        if gender == '여자':
            gender = float("0.0")
        elif gender == '남자':
            gender = float("1.0") #모델 사용 위해 float형으로 변경    
            
        # 입력값을 DataFrame으로 변환
        input_data = {'days': [days], 'height': [height], 'weight': [weight], 'gender': [gender]}
        df = pd.DataFrame(input_data)

        # DataFrame을 기존 데이터에 추가
        baby_growth_df = pd.concat([baby_growth_df, df], ignore_index=True)

        baby_growth_df.to_csv(csv_file_path, index=False)
        #height 예측 모델링
        # 독립 변수와 종속 변수 분리
        X = baby_growth_df[['days','gender']]
        y = baby_growth_df['height']

        # train/test 데이터 분리, 성별 비중 유지
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, stratify=X['gender'], random_state=42)
        
        # linear regression 모델 학습
        lr_height = LinearRegression()
        lr_height.fit(X_train, y_train)

        # test 데이터로 예측
        y_pred = lr_height.predict(X_test)

        #Weight 예측 모델링
        # 독립 변수와 종속 변수 분리
        X_data = baby_growth_df[['days','gender','height']]
        y_target = baby_growth_df['weight']

        # train/test 데이터 분리, 성별 비중 유지
        X_train, X_test, y_train, y_test = train_test_split(X_data, y_target, test_size=0.25, stratify=X_data['gender'], random_state=42)
        
        lr_weight = LinearRegression()

        lr_weight.fit(X_train, y_train)
        lr_weight.score(X_test, y_test)
    
        one_month_pred_height = (lr_height.predict(np.array([days+30, gender]).reshape(1, -1))).tolist()
        three_month_pred_height = (lr_height.predict(np.array([days+90, gender]).reshape(1, -1))).tolist()
        six_month_pred_height = (lr_height.predict(np.array([days+180, gender]).reshape(1, -1))).tolist()

        one_month_pred_weight = (lr_weight.predict(np.array([days+30, gender, one_month_pred_height[0]]).reshape(1, -1))).tolist()
        three_month_pred_weight = (lr_weight.predict(np.array([days+90, gender, three_month_pred_height[0]]).reshape(1, -1))).tolist()
        six_month_pred_weight = (lr_weight.predict(np.array([days+180, gender, six_month_pred_height[0]]).reshape(1, -1))).tolist()
        
        one_month_pred_height = round(one_month_pred_height[0],2)
        three_month_pred_height = round(three_month_pred_height[0],2)
        six_month_pred_height = round(six_month_pred_height[0],2)
        one_month_pred_weight = round(one_month_pred_weight[0],2)
        three_month_pred_weight = round(three_month_pred_weight[0],2)
        six_month_pred_weight = round(six_month_pred_weight[0],2)

        # 독립 변수와 종속 변수 분리
        X = baby_growth_df[['days','gender']]
        y = baby_growth_df['height']

        # train/test 데이터 분리, 성별 비중 유지
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, 
                                                            stratify=X['gender'], random_state=42)

        # for height graph
        graph_height = [height] # 0일 뒤 키 == 현재 입력 키
        x_height_days = list(range(1,181)) # 1일 뒤부터 180일 뒤 까지
        for i in range(1,181):
            graph_height.append(round(lr_height.predict([[days + i, gender]])[0],2))
        #graph_height

        # for weight graph
        graph_weight = [weight] # 0일 뒤 몸무게 == 현재 입력 몸무게
        x_weight_days = list(range(1,181)) # 1일 뒤부터 180일 뒤 까지
        for i in range(1,181):
            graph_weight.append(round(lr_weight.predict([[days + i, gender, graph_height[i]]])[0], 2))
        #graph_weight
        
        result = {
            'one_month_pred_height': one_month_pred_height, #cm
            'three_month_pred_height': three_month_pred_height, #cm
            'six_month_pred_height': six_month_pred_height, #cm
            'one_month_pred_weight': one_month_pred_weight, #kg
            'three_month_pred_weight': three_month_pred_weight, #kg
            'six_month_pred_weight': six_month_pred_weight, #kg
            'graph_height': graph_height,
            'graph_weight': graph_weight
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