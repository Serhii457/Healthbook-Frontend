import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const AdminRequestsPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/requests');
      setRequests(res.data);
    } catch (err) {
      console.error('Помилка при завантаженні заявок:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цю заявку?')) return;

    try {
      await api.delete(`/requests/${id}`);
      setRequests(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      alert('Помилка при видаленні заявки');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Заявки на прийом</h1>

      {requests.length === 0 ? (
        <p>Немає заявок</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>ПІБ</th>
                <th>Телефон</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.phone}</td>
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

export default AdminRequestsPage;
