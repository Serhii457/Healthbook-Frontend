import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AppointmentSection.css';

const AppointmentSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/appointment');
  };

  return (
    <section className="appointment-section my-5">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-6"></div>
      <div className="col-md-6">
        <div
          className="content-box p-4 rounded"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
        >
          <h2 style={{ color: '#144366', textAlign: 'justify' }}>
            Health<b style={{ color: '#49b86e' }}>Life</b>
          </h2>
          <h4 style={{ textAlign: 'justify', marginBottom: '1.5rem' }}>
            Надання високопрофесійної медичної допомоги втілено та уособлено у
            нашому гаслі – “Єдина краса, яку ми знаємо – це здоров’я”
          </h4>
          <button className="btn btn-success btn-lg w-100" onClick={handleClick}>
            Запис на прийом
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default AppointmentSection;
