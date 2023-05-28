import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Header from './Header';

import Chart from 'chart.js/auto';

const Check = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [plot_data_mean_height, setPlotDataMeanHeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [plot_std_height, setPlotStdHeight] = useState(0);
  const [plot_data_mean_weight, setPlotDataMeanWeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [plot_std_weight, setPlotStdWeight] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/sndpage/api/calculate/', {
          height,
          weight,
          
        });
        //데이터 가져오기
        setPlotDataMeanHeight(response.data.plot_data_mean_height);
        setHeight(response.data.height);
        setPlotStdHeight(response.data.plot_std_height);
        setPlotDataMeanWeight(response.data.plot_data_mean_weight);
        setWeight(response.data.weight);
        setPlotStdWeight(response.data.plot_std_weight);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("isLoading:", isLoading); // isLoading 값 콘솔로 출력
  }, [isLoading]);

  const heightData = {
    labels: ['아이의 신장', '평균 신장', '표준 신장'],
    datasets: [
      {
        label: '신장(cm)',
        data: [height, plot_data_mean_height, plot_std_height],
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
        data: [weight, plot_data_mean_weight, plot_std_weight],
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
          <h4 style={{  fontFamily: 'Helvetica, sans-serif' ,fontSize: '13px',textAlign: 'center' }}>&nbsp;&nbsp;&nbsp;&nbsp;*표준 키(cm): 2017 소아청소년 성장도표 기준</h4>
          <br></br>
          <br></br>
          <h4 style={{ fontFamily: 'Jua, sans-serif' ,textAlign: 'center' }}>아이의 신장은 상위 100.00% 입니다.</h4>

        </div>
        <div style={{ flex: 1, margin: '20px', width: '400px', height: '300px' }}>
        <h3 style={{  fontFamily: 'Jua, sans-serif' ,textAlign: 'center' }}>&lt;아이의 체중과 평균 체중 비교&gt;</h3>

        {!isLoading && <Bar data={weightData} options={weightOptions} />}
          <h4 style={{  fontFamily: 'Helvetica, sans-serif' ,fontSize: '13px',textAlign: 'center'  }}>&nbsp;&nbsp;&nbsp;&nbsp;*표준 몸무게(kg): 2017 소아청소년 성장도표 기준</h4>
          <br></br>
          <br></br>
          <h4 style={{ fontFamily: 'Jua, sans-serif' ,textAlign: 'center' }}>아이의 체중은 상위 75.00% 입니다.</h4>

        </div>
      </div>
    </div>
  );
};

export default Check;