import React from 'react';
import './styles/ServicesSection.css';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'Пластична хірургія',
    image: '/images/services/plastika.jpg',
    description: 'Усуваємо деформації та дефекти'
  },
  {
    id: 2,
    title: 'Проктологія',
    image: '/images/services/proktologiya.jpg',
    description: 'Лікування наболілих проблем'
  },
  {
    id: 3,
    title: 'УЗД',
    image: '/images/services/uzd.jpg',
    description: 'Сучасне ультразвукове дослідження'
  },
  {
    id: 4,
    title: 'Хірургія',
    image: '/images/services/hirurgia.jpg',
    description: 'Професійна хірургічна допомога'
  },
  {
    id: 5,
    title: 'Судинна хірургія',
    image: '/images/services/sudinna-hir.jpg',
    description: 'Варикозна хвороба, варикоз, тромбофлебіт'
  },
  {
    id: 6,
    title: 'Ендоскопія',
    image: '/images/services/endoskopia.jpg',
    description: 'Точна діагностика та обстеження'
  }
];

const ServicesSection = () => {
  const navigate = useNavigate();

  const handleNavigate = (title) => {
    navigate('/services', { state: { scrollTo: title.toLowerCase() } });
  };

  return (
    <section className="services-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Наші послуги</h2>
        <div className="row g-4">
          {services.map(service => (
            <div className="col-12 col-md-4" key={service.id}>
              <div className="card h-100 text-center p-3 shadow-sm service-card">
                <img
                  src={service.image}
                  alt={service.title}
                  className="card-img-top mb-3 rounded"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
                <button
                  className="btn btn-outline-primary btn-sm mt-auto"
                  onClick={() => handleNavigate(service.title)}
                >
                  Детальніше
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;