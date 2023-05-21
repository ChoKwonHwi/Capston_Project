import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';

import Header from "./Header";

const Check = () => {
  const [searchParams] = useSearchParams();

  const days = searchParams.get('days');
  const gender = searchParams.get('gender');
  const height = searchParams.get('height');
  const weight = searchParams.get('weight');

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

  const chartData = {
    labels: ['Std Height', 'Std Weight', 'Mean Height', 'Mean Weight'],
    datasets: [
      {
        label: 'Comparison',
        data: [
          result && result.plot_std_height,
          result && result.plot_std_weight,
          result && result.plot_data_mean_height,
          result && result.plot_data_mean_weight,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Header></Header>
      <h1>Check</h1>
      
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>

      {/* Display the result */}
      {result && (
        <div>
          <p>Result:</p>
          <Bar data={chartData} options={chartOptions} />
          <p>Height Percent: {result.height_percent}</p>
          <p>Weight Percent: {result.weight_percent}</p>
        </div>
      )}
    </div>
  );
};

export default Check;