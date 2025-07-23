import React, { useEffect, useRef } from 'react';
import './styles/ServicesPage.css';
import { useLocation } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'Хірургія',
    description: 'Наші хірурги проводять широкий спектр операцій з використанням сучасного обладнання. Холецистит, апендицит, грижі, ліпома, фурункул, атерома, панарицій, абсцес, врісший ніготь.',
    image: '/images/services/hirurgia.jpg',
  },
  {
    id: 2,
    title: 'УЗД',
    description: 'Ультразвукова діагностика (УЗД) – це неінвазивний і безболісний метод дослідження стану внутрішніх органів і тканин за допомогою ультразвукових хвиль.',
    image: '/images/services/uzd.jpg',
  },
  {
    id: 3,
    title: 'Ендоскопія',
    description: 'Ендоскопія — метод спостереження змін всередині тіла та обстеження органів людини за допомогою ендоскопа.',
    image: '/images/services/endoskopia.jpg',
  },
  {
    id: 4,
    title: 'Пластична хірургія',
    description: 'Ліпосакція; ліпофілінг; абдомінопластика; блефаропластика; отопластика; ринопластика; інтимна хірургія тощо.',
    image: '/images/services/plastika.jpg',
  },
  {
    id: 5,
    title: 'Проктологія',
    description: 'Лікування хвороб товстої кишки та відхідника, а також параректальної ділянки.',
    image: '/images/services/proktologiya.jpg',
  },
  {
    id: 6,
    title: 'Судинна хірургія',
    description: 'Атеросклероз, аневризма аорти, варикоз, тромбоз, стеноз, емболія.',
    image: '/images/services/sudinna-hir.jpg',
  },
];

const ServicesPage = () => {
  const location = useLocation();
  const sectionRefs = useRef({});

  useEffect(() => {
    const scrollToId = location.state?.scrollTo;
    if (scrollToId && sectionRefs.current[scrollToId]) {
      sectionRefs.current[scrollToId].scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  return (
    <>
      <div className="services-banner text-white d-flex align-items-center justify-content-center text-center">
        <div className="overlay"></div>
        <div className="z-2 position-relative">
          <h1 className="mb-3">Наші послуги</h1>
          <p className="lead">Широкий спектр медичних напрямків під одним дахом</p>
        </div>
      </div>

      <div className="container py-5">
        {services.map((service, index) => (
          <section
            key={service.id}
            ref={el => sectionRefs.current[service.title.toLowerCase()] = el}
            className={`row align-items-center mb-5 ${index % 2 !== 0 ? 'flex-md-row-reverse' : ''}`}
          >
            <div className="col-md-6">
              <img src={service.image} alt={service.title} className="img-fluid rounded shadow-sm" />
            </div>
            <div className="col-md-6">
              <h3>{service.title}</h3>
              <p className="lead">{service.description}</p>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default ServicesPage;
