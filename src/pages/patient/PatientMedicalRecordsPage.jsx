import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const PatientMedicalRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyRecords();
  }, []);

  const fetchMyRecords = async () => {
    try {
      const res = await api.get('/medical-records/my');
      setRecords(res.data);
      setError(null);
    } catch (err) {
      console.error('Помилка при завантаженні записів:', err);
      setError('Не вдалося завантажити ваші записи.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Мої медичні записи</h2>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Завантаження...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : records.length === 0 ? (
        <p>У вас поки що немає записів.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>Лікар</th>
                <th>Діагноз</th>
                <th>Дата</th>
                <th>Коментар</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record.id}>
                  <td>{record.doctor?.fullName || '—'}</td>
                  <td>{record.diagnosis}</td>
                  <td>{record.date}</td>
                  <td>{record.comment || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientMedicalRecordsPage;
