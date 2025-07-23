import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const PatientAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get('/appointments/my');
      setAppointments(res.data);
      setError(null);
    } catch (err) {
      console.error('Помилка при завантаженні записів:', err);
      setError('Не вдалося завантажити ваші записи на прийом.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Мої записи на прийом</h2>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Завантаження...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : appointments.length === 0 ? (
        <p>У вас поки що немає записів.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Лікар</th>
                <th>Спеціалізація</th>
                <th>Дата</th>
                <th>Час</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(app => (
                <tr key={app.id}>
                  <td>{app.doctor?.fullName || '—'}</td>
                  <td>{app.doctor?.specialization || '—'}</td>
                  <td>{app.date}</td>
                  <td>{app.time}</td>
                  <td>{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientAppointmentsPage;
