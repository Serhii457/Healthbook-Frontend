import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.get('/patients')
      .then(response => setPatients(response.data))
      .catch(error => console.error('Ошибка при получении пациентов:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Пацієнти</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ПІБ</th>
            <th>Телефон</th>
            <th>Дата народження</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id}>
              <td>{p.fullName}</td>
              <td>{p.phone}</td>
              <td>{p.birthDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsPage;
