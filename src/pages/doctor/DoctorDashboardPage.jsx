import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorDashboardPage = () => {
  const navigate = useNavigate();

  const sections = [
    { title: 'Пацієнти', path: '/doctor/patients', color: 'success' },
    { title: 'Медичні записи по всіх паціентах', path: '/doctor/all-records', color: 'danger' },
  ];

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Адмін-панель</h1>
      <div className="row g-4">
        {sections.map((section, idx) => (
          <div className="col-12 col-md-6" key={idx}>
            <div
              className={`card border-${section.color} shadow h-100`}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(section.path)}
            >
              <div className={`card-body text-${section.color} text-center`}>
                <h5 className="card-title">{section.title}</h5>
                <p className="card-text">Перейти до керування</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
