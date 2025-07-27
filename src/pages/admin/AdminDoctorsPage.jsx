import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const AdminDoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    username: '',
    password: '',
    specializationId: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');
  const pageSize = 10;

  useEffect(() => {
    fetchDoctors(currentPage, sortOrder);
    fetchSpecializations();
  }, [currentPage, sortOrder]);

  const fetchDoctors = async (page, order) => {
    try {
      const res = await api.get(`/doctors/page?page=${page}&size=${pageSize}&sort=fullName,${order}`);
      setDoctors(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Помилка завантаження лікарів:', err);
    }
  };

  const fetchSpecializations = async () => {
    try {
      const res = await api.get('/specializations');
      setSpecializations(res.data);
    } catch (err) {
      console.error('Помилка завантаження спеціалізацій:', err);
    }
  };

  const handleSortByFullName = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    setCurrentPage(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const registerDoctorUser = async (username, password, fullName, phone, specializationId) => {
    try {
      await api.post('/registerDoctor', null, {
        params: { username, password, fullName, phone, specializationId }
      });
      return true;
    } catch (err) {
      alert('Помилка при реєстрації користувача-лікаря');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.specializationId) {
      alert('Будь ласка, заповніть всі обов’язкові поля');
      return;
    }

    const specializationId = parseInt(formData.specializationId, 10);
    if (isNaN(specializationId)) {
      alert('Оберіть коректну спеціалізацію');
      return;
    }

    if (!editingId) {
      if (!formData.username || !formData.password) {
        alert('Будь ласка, введіть імʼя користувача та пароль');
        return;
      }
    }

    try {
      if (editingId) {
        const updatedDoctor = {
          fullName: formData.fullName,
          phone: formData.phone,
          specialization: { id: specializationId }
        };
        await api.put(`/doctors/${editingId}`, updatedDoctor);
      } else {
        const registered = await registerDoctorUser(
          formData.username,
          formData.password,
          formData.fullName,
          formData.phone,
          formData.specializationId
        );
        if (!registered) return;
      }
      fetchDoctors(currentPage, sortOrder);
      resetForm();
    } catch (err) {
      console.error('Помилка при збереженні лікаря:', err);
      alert('Помилка при збереженні лікаря');
    }
  };

  const handleEdit = (doc) => {
    setFormData({
      fullName: doc.fullName || '',
      phone: doc.phone || '',
      username: doc.username || '',
      password: '',
      specializationId: doc.specialization?.id ? String(doc.specialization.id) : ''
    });
    setEditingId(doc.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Видалити лікаря?')) return;
    try {
      await api.delete(`/doctors/${id}`);
      fetchDoctors(currentPage, sortOrder);
      if (editingId === id) resetForm();
    } catch (err) {
      console.error('Помилка при видаленні лікаря:', err);
      alert('Неможливо видалити лікаря, поки у нього є заявки на прийом');
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      username: '',
      password: '',
      specializationId: ''
    });
    setEditingId(null);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Керування лікарями</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="ПІБ" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div className="col-md-2">
          <input type="text" className="form-control" placeholder="Телефон" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="col-md-2">
          <input type="text" className="form-control" placeholder="Імʼя користувача" name="username" value={formData.username} onChange={handleChange} required={!editingId} disabled={!!editingId} />
        </div>
        <div className="col-md-2">
          <input type="password" className="form-control" placeholder="Пароль" name="password" value={formData.password} onChange={handleChange} required={!editingId} />
        </div>
        <div className="col-md-2">
          <select className="form-select" name="specializationId" value={formData.specializationId || ""} onChange={handleChange} required>
            <option value="">Оберіть спеціалізацію</option>
            {specializations.map(spec => (
              <option key={spec.id} value={spec.id}>{spec.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-1">
          <button className="btn btn-success w-100" type="submit">
            {editingId ? 'Оновити' : 'Додати'}
          </button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ cursor: 'pointer' }} onClick={handleSortByFullName}>
                ПІБ {sortOrder === 'asc' ? '↑' : '↓'}
              </th>
              <th>Телефон</th>
              <th>Спеціалізація</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doc => (
              <tr key={doc.id}>
                <td>{doc.fullName}</td>
                <td>{doc.phone}</td>
                <td>{doc.specialization || '—'}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(doc)}>Редагувати</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(doc.id)}>Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {[...Array(totalPages)].map((_, idx) => (
                <li key={idx} className={`page-item ${currentPage === idx ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(idx)}>{idx + 1}</button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AdminDoctorsPage;