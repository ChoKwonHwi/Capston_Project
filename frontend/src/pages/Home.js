import homeImage1 from "../img/home-img.png";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


import Header from "./Header";
import { useState } from "react";

const Home = () => {
    return(
      <div>
        
        <Header></Header>

        <section className="sub-coment">
            
            <form>
                생후일수 : <input type = "text" placeholder="생후일수를 입력하세요" name = "days" /><br /><br />
                성별: <input type = "text" placeholder="성별을 입력하세요" name = "sex" /><br /><br />
                키: <input type = "text" placeholder="키를 입력하세요" name = "height" /><br /><br />
                몸무게: <input type = "text" placeholder="몸무게를 입력하세요" name = "weight" /><br /><br />
                <Button type="submit" >성장예측</Button>{' '}
                <Button type="submit" >성장현황</Button>{' '}
            </form>
             
            
        </section>

        <section className="introduce">
        <div>
          <h3>
            "육아 체크"
            <small>
              는 아이의 성장률을 예측해주고 아이의 현재 발달 수준을 비교 분석해서
              <br></br>부모에게 아이 맞춤형 정보를 제공하는 사이트입니다.
            </small>
          </h3>
          
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