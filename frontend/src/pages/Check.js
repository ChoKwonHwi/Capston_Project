import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Header from './Header';

const Check = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [averageHeight, setAverageHeight] = useState(0);
  const [childHeight, setChildHeight] = useState(0);
  const [standardAverageHeight, setStandardAverageHeight] = useState(0);
  const [averageWeight, setAverageWeight] = useState(0);
  const [childWeight, setChildWeight] = useState(0);
  const [standardAverageWeight, setStandardAverageWeight] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/sndpage/api/calculate/', {
          height: childHeight,
          weight: childWeight,
          
        });

        setAverageHeight(response.data.plot_data_mean_height);
        setChildHeight(response.data.height);
        setStandardAverageHeight(response.data.plot_std_height);
        setAverageWeight(response.data.plot_data_mean_weight);
        setChildWeight(response.data.weight);
        setStandardAverageWeight(response.data.plot_std_weight);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const heightData = {
    labels: ['아이의 신장', '평균 신장', '표준 신장'],
    datasets: [
      {
        label: '신장(cm)',
        data: [childHeight, averageHeight, standardAverageHeight],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        borderWidth: 1,
      },
    ],
  };

  const weightData = {
    labels: ['아이의 체중', '평균 체중', '표준 체중'],
    datasets: [
      {
        label: '체중(kg)',
        data: [childWeight, averageWeight, standardAverageWeight],
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
      <Header></Header>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, margin: '20px', width: '400px', height: '300px' }}>
        <h3 style={{  fontFamily: 'Jua, sans-serif' ,textAlign: 'center' }}>&lt;아이의 신장과 평균 신장 비교&gt;</h3>
        
        {!isLoading && <Bar data={heightData} options={options} />}
          <h9 style={{  fontFamily: 'Helvetica, sans-serif' ,fontSize: '13px',textAlign: 'center' }}>&nbsp;&nbsp;&nbsp;&nbsp;*표준 키(cm): 2017 소아청소년 성장도표 기준</h9>
          <br></br>
          <br></br>
          <h4 style={{ fontFamily: 'Jua, sans-serif' ,textAlign: 'center' }}>아이의 신장은 상위 100.00% 입니다.</h4>

        </div>
        <div style={{ flex: 1, margin: '20px', width: '400px', height: '300px' }}>
        <h3 style={{  fontFamily: 'Jua, sans-serif' ,textAlign: 'center' }}>&lt;아이의 몸무게와 평균 몸무게 비교&gt;</h3>

        {!isLoading && <Bar data={weightData} options={weightOptions} />}
          <h9 style={{  fontFamily: 'Helvetica, sans-serif' ,fontSize: '13px',textAlign: 'center'  }}>&nbsp;&nbsp;&nbsp;&nbsp;*표준 몸무게(kg): 2017 소아청소년 성장도표 기준</h9>
          <br></br>
          <br></br>
          <h4 style={{ fontFamily: 'Jua, sans-serif' ,textAlign: 'center' }}>아이의 체중은 상위 75.00% 입니다.</h4>

        </div>
      </div>
    </div>
  );
};

export default Check;