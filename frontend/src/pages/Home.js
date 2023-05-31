import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"; 

import homeImage1 from "../img/home-img.png";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


const Home = () => {
  const [formData, setFormData] = useState({
    days: '',
    gender: '',
    height: '',
    weight: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e, page) => {
    e.preventDefault();

    // Make an HTTP POST request to the Django endpoint
    axios.post('http://127.0.0.1:8000/babycare/api/users/', formData)
      .then((response) => {
        console.log('Success:', response.data);
        // Handle the response as needed

        // Build the query parameters string
      const queryParams = `days=${formData.days}&gender=${formData.gender}&height=${formData.height}&weight=${formData.weight}`;

        // Navigate to the appropriate page based on the button clicked
        if (page === 'predict') {
          navigate(`/predict?${queryParams}`);
        } else if (page === 'check') {
          navigate(`/check?${queryParams}`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors
      });

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
      
      </div>
      <br></br><br></br><br></br>
      <form onSubmit={handleSubmit} style={{ fontSize: '20px' }}>
        <label htmlFor="days">생후일수: &nbsp;&nbsp;</label>
        <input
          type="text"
          placeholder="생후일수를 입력하세요"
          name="days"
          value={formData.days}
          onChange={handleChange}
          id="days" 
        /><br /><br />

        <label htmlFor="gender" style={{ fontSize: '22px' }}>성별: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          id="gender" 
        >
          <option value="">성별을 선택하세요</option>
          <option value="male">남자</option>
          <option value="female">여자</option>
        </select><br /><br />

        <label htmlFor="height">키(cm): &nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input
          type="text"
          placeholder="키를 입력하세요"
          name="height"
          value={formData.height}
          onChange={handleChange}
          id="height" 
        /><br /><br />

        <label htmlFor="weight">몸무게(kg): &nbsp;</label>
        <input
          type="text"
          placeholder="몸무게를 입력하세요"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          id="weight" 
        /><br /><br />
        <div class="centered-buttons">
        <button type="submit" onClick={(e) => handleSubmit(e, 'predict')} style={{ backgroundColor: '#007bff', borderRadius: '5px',  color: 'white', border: 'none' }}>성장예측</button>
        <button type="submit" onClick={(e) => handleSubmit(e, 'check')} style={{ backgroundColor: '#007bff', borderRadius: '5px', color: 'white', border: 'none' }}>성장현황</button>
        </div>
      </form>

      
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