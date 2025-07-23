import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const AdminMedicalRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await api.get('/medical-records');
      setRecords(res.data);
      setError(null);
    } catch (err) {
      console.error('Помилка при завантаженні записів:', err);
      setError('Не вдалося завантажити медичні записи.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Видалити запис?')) return;
    try {
      await api.delete(`/medical-records/${id}`);
      setRecords(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      alert('Помилка при видаленні запису');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Медичні записи</h2>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Завантаження...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : records.length === 0 ? (
        <p>Записів немає</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Пацієнт</th>
                <th>Лікар</th>
                <th>Діагноз</th>
                <th>Дата</th>
                <th>Коментар</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {records.map(r => (
                <tr key={r.id}>
                  <td>{r.patient?.fullName || '—'}</td>
                  <td>{r.doctor?.fullName || '—'}</td>
                  <td>{r.diagnosis}</td>
                  <td>{r.date}</td>
                  <td>{r.comment || '—'}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(r.id)}
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminMedicalRecordsPage;

