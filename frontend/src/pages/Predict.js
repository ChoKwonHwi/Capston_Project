import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Header from './Header';

const Predict = () => {
  const [result, setResult] = useState(null);
  const { days, gender, height, weight } = useParams(); // useParams를 사용해서 값을 가져옴
  useEffect(() => {
    
    axios
      .post('http://127.0.0.1:8000/fstpage/api/predict/', {
        days,
        gender,
        height,
        weight
      })
      .then((response) => {
        
        setResult(response.data);
      })
      .catch((error) => {
        
        console.error('Error:', error);
      });
  }, [days, gender, height, weight]);


  
      const heightData = {
        labels: Array.from({ length: result?.graph_height.length }, (_, i) => i + 1),
        datasets: [
          {
            label: '키(cm)',
            data: result?.graph_height,
            fill: false,
            borderColor: 'blue',
            tension: 0.3,
            pointRadius: 0, // 점의 반지름을 0으로 설정하여 숨김
            yAxisID: 'height',
          },
        ],
      };

      const weightData = {
        labels: Array.from({ length: result?.graph_height.length }, (_, i) => i + 1),
        datasets: [
          {
            label: '몸무게(kg)',
            data: result?.graph_weight,
            fill: false,
            borderColor: 'red',
            tension: 0.3,
            pointRadius: 0, // 점의 반지름을 0으로 설정하여 숨김
            yAxisID: 'weight',
          },
        ],
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
          {result && <Line data={heightData} options={options} />}
        </div>
        <div style={{ width: '35%' }}>
          <br></br><br></br><br></br><br></br>
          {result && (
          <>
            <h4 style={{ fontFamily: 'Jua, sans-serif' }}>아이의 1개월 뒤 예상 키는 {result.one_month_pred_height}cm 입니다.</h4>
            <h4 style={{ fontFamily: 'Jua, sans-serif' }}>아이의 3개월 뒤 예상 키는 {result.three_month_pred_height}cm 입니다.</h4>
            <h4 style={{ fontFamily: 'Jua, sans-serif' }}>아이의 6개월 뒤 예상 키는 {result.six_month_pred_height}cm 입니다.</h4>
          </>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '60px' }}>
        <div style={{ width: '60%', marginRight: '30px' }}>
          <h3 style={{ fontFamily: 'Jua, sans-serif', textAlign: 'center' }}>&lt;예상 몸무게 그래프&gt;</h3>
          {result && <Line data={weightData} options={weightOptions} />}
        </div>
        <div style={{ width: '35%' }}>
          <br></br><br></br><br></br><br></br>
          {result && (
          <>
            <h4 style={{ fontFamily: 'Jua, sans-serif' }}>아이의 1개월 뒤 예상 몸무게는 {result.one_month_pred_weight}kg 입니다.</h4>
            <h4 style={{ fontFamily: 'Jua, sans-serif' }}>아이의 3개월 뒤 예상 몸무게는 {result.three_month_pred_weight}kg 입니다.</h4>
            <h4 style={{ fontFamily: 'Jua, sans-serif' }}>아이의 6개월 뒤 예상 몸무게는 {result.six_month_pred_weight}kg 입니다.</h4>
          </>
          )}
        </div>
      </div>






    </div>
  );
};

export default Predict;