import React from "react";
import "./styles/Header.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/appointment');
  };
  return (
    <div className="bg-light py-4 border-bottom">
      <div className="container">
        <div className="row text-center text-md-start align-items-center">

          <div className="col-12 col-md-3 mb-2 mb-md-0 logo">
            <img
              src="/public/logo_healthLife.png"
              alt="Логотип клініки"
              style={{ maxHeight: "55px" }}
            />
          </div>

          <div className="col-12 col-md-3 mb-2 mb-md-0">
            <strong>Години роботи:</strong><br />
            Пн–Пт: 09:00 – 18:00
          </div>

          <div className="col-12 col-md-3 mb-2 mb-md-0">
            <button className="btn btn-success btn-lg w-100" onClick={handleClick}>
            Записатися на прийом
          </button>
          </div>

          <div className="col-12 col-md-3">
            <a href="tel:+380501234567" className="text-decoration-none d-block">
              📞 +38 (050) 123-45-67
            </a>
            <div>м. Чернівці, вул. Клінічна, 1</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;
