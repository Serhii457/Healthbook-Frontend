import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const AdminPatientsPage = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const pageSize = 8;

  useEffect(() => {
    fetchRequests(currentPage, sortField, sortDirection);
  }, [currentPage, sortField, sortDirection]);

  const fetchRequests = async (page, field, direction) => {
    try {
      const res = await api.get(
        `/appointment-requests/page?page=${page}&size=${pageSize}&sort=${field},${direction}`
      );
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
      fetchRequests(currentPage, sortField, sortDirection);
    } catch (error) {
      console.error('Помилка при видаленні заявки:', error);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection(field === 'date' ? 'desc' : 'asc');
    }
    setCurrentPage(0);
  };

  const renderSortArrow = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Пацієнти, які записались на прийом</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('fullName')}
            >
              Ім'я і прізвище{renderSortArrow('fullName')}
            </th>
            <th>Телефон</th>
            <th>Лікар</th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => handleSort('date')}
            >
              Дата{renderSortArrow('date')}
            </th>
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
            requests.map((req) => (
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
