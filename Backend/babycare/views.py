from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserDataSerializer

from .models import UserData
import requests

class UserDataView(APIView):
    def post(self, request):
        serializer = UserDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            # 네 개의 입력값을 serializer.validated_data로 추출
            height = serializer.validated_data.get('height')
            weight = serializer.validated_data.get('weight')
            gender = serializer.validated_data.get('gender')
            days = serializer.validated_data.get('days')

            # sndpage 앱으로 데이터 전송
            url = 'http://127.0.0.1:8000/sndpage/api/calculate/'
            data = {
                'height': height,
                'weight': weight,
                'gender': gender,
                'days': days
            }
            response = requests.post(url, json=data)
            
            if response.status_code == 200:
                result = response.json()
                # 결과 처리 로직 작성
            else:
                print("데이터 전송 실패")

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
