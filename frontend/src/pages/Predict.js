import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Header from './Header';

const Predict = () => {
  const [heightData, setHeightData] = useState({ datasets: [] });
  const [weightData, setWeightData] = useState({ datasets: [] });
  const [predictionData, setPredictionData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/fstpage/api/predict/'); 
      const data = response.data;

      const heightChartData = {
        labels: Array.from({ length: data.graph_height.length }, (_, i) => i + 1),
        datasets: [
          {
            label: '키(cm)',
            data: data.graph_height,
            fill: false,
            borderColor: 'blue',
            tension: 0.3,
            pointRadius: 0, // 점의 반지름을 0으로 설정하여 숨김
            yAxisID: 'height',
          },
        ],
      };

      const weightChartData = {
        labels: Array.from({ length: data.graph_weight.length }, (_, i) => i + 1),
        datasets: [
          {
            label: '몸무게(kg)',
            data: data.graph_weight,
            fill: false,
            borderColor: 'red',
            tension: 0.3,
            pointRadius: 0, // 점의 반지름을 0으로 설정하여 숨김
            yAxisID: 'weight',
          },
        ],
      };

      setHeightData(heightChartData);
      setWeightData(weightChartData);
      setPredictionData(data);
    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: '일 수',
          align: 'end', // 우측 정렬
          position: 'bottom', // 하단에 표시
        },
      },
      
      
    },
  };

  const weightOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: '일 수',
          align: 'end', // 우측 정렬
          position: 'bottom', // 하단에 표시
      },
        
      },
      
      
      
    },
  };


  return (
    <div>
      <Header></Header>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '60px' }}>
        <div style={{ width: '60%', marginRight: '30px' }}>
          <h3 style={{ fontFamily: 'Jua, sans-serif', textAlign: 'center' }}>&lt;예상 키 그래프&gt;</h3>
          <Line data={heightData} options={options} />
        </div>
        <div style={{ width: '35%' }}>
          <br></br><br></br><br></br><br></br>
          <h4 style={{ fontFamily: 'Jua, sans-serif' }}>아이의 1개월 뒤 예상 키는 {predictionData.one_month_pred_height}cm 입니다.</h4>
          <h4 style={{ fontFamily: 'Jua, sans-serif' }}>아이의 3개월 뒤 예상 키는 {predictionData.three_month_pred_height}cm 입니다.</h4>
          <h4 style={{ fontFamily: 'Jua, sans-serif' }}>아이의 6개월 뒤 예상 키는 {predictionData.six_month_pred_height}cm 입니다.</h4>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '60px' }}>
        <div style={{ width: '60%', marginRight: '30px' }}>
          <h3 style={{ fontFamily: 'Jua, sans-serif', textAlign: 'center' }}>&lt;예상 몸무게 그래프&gt;</h3>
          <Line data={weightData} options={weightOptions} />
        </div>
        <div style={{ width: '35%' }}>
          <br></br><br></br><br></br><br></br>
          <h4 style={{ fontFamily: 'Jua, sans-serif' }}>아이의 1개월 뒤 예상 몸무게는 {predictionData.one_month_pred_weight}kg 입니다.</h4>
          <h4 style={{ fontFamily: 'Jua, sans-serif' }}>아이의 3개월 뒤 예상 몸무게는 {predictionData.three_month_pred_weight}kg 입니다.</h4>
          <h4 style={{ fontFamily: 'Jua, sans-serif' }}>아이의 6개월 뒤 예상 몸무게는 {predictionData.six_month_pred_weight}kg 입니다.</h4>
        </div>
      </div>






    </div>
  );
};

export default Predict;