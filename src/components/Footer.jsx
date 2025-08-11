import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import "./styles/Footer.css";

const Footer = () => {

  const navigate = useNavigate();
  const handleScrollToService = (serviceKey) => {
    navigate('/services', { state: { scrollTo: serviceKey } });
   };

  return (
    <div className="btFooterWrap bg-dark text-light pt-5">
      <section className="container pb-5">
        <div className="row">
          <div className="col-md-4 mb-4 text-md-center">
            <img
              src="./logo_health_life.png"
              alt="Логотип клініки"
              style={{ width: '80%' }}
            />
            <p className="mt-3 text-justify">
              Ми створили місце, де сучасність зустрічається з досвідом і індивідуальним підходом до пацієнта. Ми пропонуємо висококваліфіковану хірургічну допомогу та новітні малоінвазивні методи лікування, ефективність яких підтверджена думками задоволених клієнтів.
            </p>
            <p className="text-justify">
              ©{' '}
              <a
                href="https://healthbook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-light"
              >
                Медичний центр HealhtLife
              </a>
            </p>
          </div>

          <div className="col-md-4 mb-4 text-md-center">
            <p className="text-justify ps-5">
              Увага! Вся інформація на цьому сайті ( фото, статті, відео) носить виключно інформаційний характер і ні при яких умовах не є публічною офертою згідно статті 641 Цивільного кодексу України. Всі права на базу данних, що відносяться до даного веб-сайту, а також вся інформація, розміщена на ньому, включаючи графічні зображення, статті, відео, фотографії належать власнику веб-сайту. Будь – яке використання інформації статей чи їх частин, фотографій, можливе тільки з вказанням прямого посилання на матеріал. Всі авторські права захищені та охороняються законом.
            </p>
          </div>

          <div className="col-md-4 mb-4 text-md-center">
            <h5 className="mb-3 ms-5 ps-5">Наші послуги</h5>
            <div className="d-flex flex-column align-items-md-centre gap-2">
              <ul className="list-unstyled ms-5 ps-5">
                <li className="footer-service" onClick={() => handleScrollToService('хірургія')} style={{ cursor: 'pointer' }}>Хірургія</li>
                <li className="footer-service" onClick={() => handleScrollToService('узд')} style={{ cursor: 'pointer' }}>УЗД</li>
                <li className="footer-service" onClick={() => handleScrollToService('ендоскопія')} style={{ cursor: 'pointer' }}>Ендоскопія</li>
                <li className="footer-service" onClick={() => handleScrollToService('пластична хірургія')} style={{ cursor: 'pointer' }}>Пластична хірургія</li>
                <li className="footer-service" onClick={() => handleScrollToService('проктологія')} style={{ cursor: 'pointer' }}>Проктологія</li>
                <li className="footer-service" onClick={() => handleScrollToService('судинна хірургія')} style={{ cursor: 'pointer' }}>Судинна хірургія</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-3">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-2 mb-md-0">
            Copyright © HealthLife 2023. All rights reserved.
          </p>
          <div>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="me-3 text-light fs-5"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-light fs-5"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;