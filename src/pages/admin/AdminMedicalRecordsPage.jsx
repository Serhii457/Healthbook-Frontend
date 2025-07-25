import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const AdminMedicalRecordsPage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get('/medical-records')
      .then(res => {
        setRecords(res.data);
      })
      .catch(err => {
        console.error('Помилка завантаження записів:', err);
      });
  }, []);

  return (
    <div className="container py-4">
      <h2>Медичні записи</h2>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Пацієнт</th>
            <th>ID запису</th>
            <th>Діагноз</th>
            <th>Рекомендації</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.id}>
              <td>{r.patientFullName}</td>
              <td>{r.id}</td>
              <td>{r.diagnosis}</td>
              <td>{r.recommendations}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMedicalRecordsPage;
