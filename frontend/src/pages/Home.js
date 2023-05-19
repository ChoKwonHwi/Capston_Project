import homeImage1 from "../img/home-img.png";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


import Header from "./Header";


import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    gender: '',
    days: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = e.target.innerText === '성장예측'
    ? 'http://localhost:8000/babycare/api/predict/'
    : 'http://localhost:8000/sndpage/api/calculate/';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };



  return (
    <div>
      {/* Your existing JSX code */}

      <Header></Header>
      <br></br><br></br>
      <section className="sub-coment">
        <form onSubmit={handleSubmit}>
        <label for="days">생후일수:{' '} </label>
          <input
            type="text"
            placeholder="생후일수를 입력하세요"
            name="days"
            value={formData.days}
            onChange={handleChange}
          /><br></br><br></br>
          <label for="gender">성별:{' '} </label>
          <input
            type="text"
            placeholder="성별을 입력하세요"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          /><br></br><br></br>
          <label for="heght">키(cm):{' '}</label> 
          <input
            type="text"
            placeholder="키를 입력하세요"
            name="height"
            value={formData.height}
            onChange={handleChange}
          /><br></br><br></br>
          <label for="heght">몸무게(kg):{' '}</label> 
          <input
            type="text"
            placeholder="몸무게를 입력하세요"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          /><br></br><br></br>
          {/* Other input fields */}
          <Link to="/predict">
          <button type="submit" style={{ marginRight: '10px' }} >성장예측</button>
          </Link>
          <Link to="/check">
          <button type="submit" >성장현황</button>
          </Link>
        </form>
      </section>

      {/* Your remaining JSX code */}
      <section className="introduce">
        <div>
          <h2>
            "육아 체크"
            <small>
              는 아이의 성장률을 예측해주고 아이의 현재 발달 수준을 비교 분석해서
              부모에게 아이 맞춤형 정보를 제공하는 사이트입니다.
            </small>
          </h2>
          
        </div>
      </section>

      <footer>
        <div className="footer-div">
          <p className="footer-content">메타케어 &copy; 육아체크</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;