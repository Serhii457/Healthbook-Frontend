import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const AdminPatientsPage = () => {
  const [requests, setRequests] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetchRequests(currentPage);
  }, [currentPage]);

  const fetchRequests = async (page) => {
    try {
      const res = await api.get(`/appointment-requests/page?page=${page}&size=${pageSize}`);
      setRequests(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Помилка при завантаженні заявок:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цю заявку?')) return;
    try {
      await api.delete(`/appointment-requests/${id}`);
      fetchRequests(currentPage);
    } catch (error) {
      console.error('Помилка при видаленні заявки:', error);
    }
  };

  const handleSortByDate = () => {
    const sorted = [...requests].sort((a, b) => {
      const dateTimeA = new Date(`${a.date || ''}T${a.time || '00:00'}`);
      const dateTimeB = new Date(`${b.date || ''}T${b.time || '00:00'}`);
      return sortDirection === 'asc' ? dateTimeA - dateTimeB : dateTimeB - dateTimeA;
    });
    setRequests(sorted);
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Пацієнти, які записались на прийом</h2>

      <div className="text-end mb-3">
        <button className="btn btn-outline-secondary" onClick={handleSortByDate}>
          Сортувати за датою і часом {sortDirection === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ПІБ</th>
            <th>Телефон</th>
            <th>Лікар</th>
            <th>Дата</th>
            <th>Час</th>
            <th>Коментар</th>
            <th>Статус</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">Немає заявок</td>
            </tr>
          ) : (
            requests.map(req => (
              <tr key={req.id}>
                <td>{req.fullName}</td>
                <td>{req.phone}</td>
                <td>{req.doctor?.fullName || req.doctorName || '—'}</td>
                <td>{req.date || '—'}</td>
                <td>{req.time || '—'}</td>
                <td>{req.note || '—'}</td>
                <td>{req.status || '—'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(req.id)}
                  >
                    Видалити
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {[...Array(totalPages)].map((_, idx) => (
                <li
                  key={idx}
                  className={`page-item ${currentPage === idx ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => setCurrentPage(idx)}>
                    {idx + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AdminPatientsPage;