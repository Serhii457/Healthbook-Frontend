import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const sections = [
    { title: 'Лікарі', path: '/admin/doctors', color: 'primary' },
    { title: 'Спеціалізації', path: '/admin/specializations', color: 'info' },
    { title: 'Пацієнти', path: '/admin/patients', color: 'success' },
    { title: 'Заявки', path: '/admin/requests', color: 'warning' },
    { title: 'Медичні записи', path: '/admin/records', color: 'danger' },
  ];

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Адмін-панель</h1>
      <div className="row g-4">
        {sections.map((section, idx) => (
          <div className="col-md-4" key={idx}>
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

export default AdminDashboardPage;
