import React from 'react';
import { useSearchParams } from 'react-router-dom';

import Header from "./Header";

const Check = () => {
  const [searchParams] = useSearchParams();

  const days = searchParams.get('days');
  const gender = searchParams.get('gender');
  const height = searchParams.get('height');
  const weight = searchParams.get('weight');

  // Rest of the component code

  return (
    <div>
      <Header></Header>
      <h1>Check</h1>
      <p>Days: {days}</p>
      <p>Gender: {gender}</p>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
    </div>
  );
};

export default Check;