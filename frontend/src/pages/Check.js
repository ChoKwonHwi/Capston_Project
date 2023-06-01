import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import homeImage1 from "../img/home-img.png";

const Check = () => {
  const [searchParams] = useSearchParams();

  const days = searchParams.get('days')|| '';
  const gender = searchParams.get('gender')|| '';
  const height = searchParams.get('height')|| '';
  const weight = searchParams.get('weight')|| '';

  const navigate = useNavigate(); // useNavigate 훅 사용

  const [result, setResult] = useState(null);

  useEffect(() => {
    // Make an HTTP POST request to the Django URL with the form data
    axios
      .post('http://127.0.0.1:8000/sndpage/api/calculate/', {
        days,
        gender,
        height,
        weight
      })
      .then((response) => {
        // Handle the response data
        setResult(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  }, [days, gender, height, weight]);

  const handlePredictButtonClick = () => {
    const queryParams = `days=${days || ''}&gender=${gender || ''}&height=${height || ''}&weight=${weight || ''}`;
    navigate(`/predict?${queryParams}`);
  };
  
  const heightData = {
    labels: ['아이의 키', '평균 키', '표준 키'],
    datasets: [
      {
        label: '키(cm)',
        data: [result && result.height, result && result.plot_data_mean_height, result && result.plot_std_height],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        borderWidth: 1,
      },
    ],
  };

  const weightData = {
    labels: ['아이의 몸무게', '평균 몸무게', '표준 몸무게'],
    datasets: [
      {
        label: '몸무게(kg)',
        data: [result && result.weight, result && result.plot_data_mean_weight, result && result.plot_std_weight],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      
      x: {
        beginAtZero: true,
        ticks: {
          color: 'black',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'black',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top-start',
      },
    },
    responsive: true,
  };


  const weightOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: 'black', // 인덱스 글씨색 설정

        },
      },
      y: {
        beginAtZero: true,
        position:'left',
        ticks: {
          color: 'black', // 인덱스 글씨색 설정
        },
      },
    },
    
    plugins: {
      legend: {
        display: false, // 라벨 숨기기
      },
      
    },
  

  };

return (
  <div>
    <div className="header">
    <Link to="/" style={{ textDecoration: 'none' }}>
    <button className="home-button" >
        <img src={homeImage1} alt="홈 이미지" className="home-image" />
          육아체크
    </button>
    
    </Link>
    
    
      <button className="predict-button ms-5 me-5" onClick={handlePredictButtonClick}>성장예측 -&gt;</button>
    
    
    </div>

    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, margin: '20px', width: '400px', height: '300px' }}>
        <h3 style={{ fontFamily: 'Jua, sans-serif', textAlign: 'center' }}>&lt;아이의 키와 평균 키 비교&gt;</h3>

        {result && (
          <>
            <Bar data={heightData} options={options} />
            <h5 style={{ fontFamily: 'Helvetica, sans-serif', fontSize: '13px', textAlign: 'center' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;*표준 키(cm): 2017 소아청소년 성장도표 기준
            </h5>
            <br />
            <br />
            <h4 style={{ fontFamily: 'Jua, sans-serif', textAlign: 'center' }}>
              아이의 키는 상위 {result.height_percent}% 입니다.
            </h4>
          </>
        )}
      </div>
      <div style={{ flex: 1, margin: '20px', width: '400px', height: '300px' }}>
        <h3 style={{ fontFamily: 'Jua, sans-serif', textAlign: 'center' }}>&lt;아이의 몸무게와 평균 몸무게 비교&gt;</h3>

        {result && (
          <>
            <Bar data={weightData} options={weightOptions} />
            <h5 style={{ fontFamily: 'Helvetica, sans-serif', fontSize: '13px', textAlign: 'center' }}>
              &nbsp;&nbsp;&nbsp;&nbsp;*표준 몸무게(kg): 2017 소아청소년 성장도표 기준
            </h5>
            <br />
            <br />
            <h4 style={{ fontFamily: 'Jua, sans-serif', textAlign: 'center' }}>
              아이의 몸무게는 상위 {result.weight_percent}% 입니다.
            </h4>
          </>
        )}
      </div>
    </div>
  </div>
);

};

export default Check;