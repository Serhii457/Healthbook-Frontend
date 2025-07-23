import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const SpecializationPage = () => {
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    api.get('/specializations')
      .then(response => setSpecializations(response.data))
      .catch(error => console.error('Ошибка при получении специализаций:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Специализации</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
          </tr>
        </thead>
        <tbody>
          {specializations.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpecializationPage;
