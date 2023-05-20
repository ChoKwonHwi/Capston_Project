import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"; // axios 모듈 추가

import homeImage1 from "../img/home-img.png";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import Header from "./Header";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make an HTTP POST request to the Django endpoint
    axios.post('http://localhost:8000/babycare/api/users/', formData)
      .then((response) => {
        console.log('Success:', response.data);
        // Handle the response as needed

        // Navigate to the Check page with form data as query parameters
        const queryParams = `days=${formData.days}&gender=${formData.gender}&height=${formData.height}&weight=${formData.weight}`;
        window.location.href = `/check?${queryParams}`;
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors
      });

      };

  return (
    <div>
      <Header></Header>
      <br></br><br></br><br></br>
      <form onSubmit={handleSubmit}>
        <label htmlFor="days">생후일수: </label>
        <input
          type="text"
          placeholder="생후일수를 입력하세요"
          name="days"
          value={formData.days}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="gender">성별: </label>
        <input
          type="text"
          placeholder="성별을 입력하세요"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="height">키(cm): </label>
        <input
          type="text"
          placeholder="키를 입력하세요"
          name="height"
          value={formData.height}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="weight">몸무게(kg): </label>
        <input
          type="text"
          placeholder="몸무게를 입력하세요"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        /><br /><br />
        <Link to="/predict">
        <button type="submit" style={{ marginRight: '10px' }} >성장예측</button>
        </Link>
        <Link to="/check">
        <button type="submit">성장현황</button>
        </Link>
      </form>
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