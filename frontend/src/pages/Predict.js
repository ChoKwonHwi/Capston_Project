import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const PredictChart = () => {
  const [chartData, setChartData] = useState({});
  const { days, gender, height, weight } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/fstpage/api/predict/', {
          days: parseInt(days),
          gender,
          height: parseFloat(height),
          weight: parseFloat(weight),
        });
        
        const data = response.data;
        
        // Chart.js 데이터 형식으로 변환
        const chartData = {
          labels: Array.from({ length: data.graph_height.length }, (_, i) => i + 1),
          datasets: [
            {
              label: 'Height (cm)',
              data: data.graph_height,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'Weight (kg)',
              data: data.graph_weight,
              fill: false,
              borderColor: 'rgb(192, 75, 75)',
              tension: 0.1,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [days, gender, height, weight]);

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default PredictChart;