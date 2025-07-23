import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const AdminPatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    userId: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get('/patients');
      setPatients(res.data);
    } catch (err) {
      console.error(err);
      alert('Помилка при завантаженні пацієнтів');
    }
  };
  
  const resetForm = () => {
    setFormData({ fullName: '', phone: '', userId: '' });
    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        user: { id: formData.userId }
      };

      if (editingId) {
        await api.put(`/patients/${editingId}`, payload);
      } else {
        await api.post('/patients', payload);
      }
      resetForm();
      fetchPatients();
    } catch (err) {
      console.error(err);
      alert('Помилка при збереженні пацієнта');
    }
  };

  const handleEdit = (patient) => {
    setFormData({
      fullName: patient.fullName,
      phone: patient.phone,
      userId: patient.user?.id || ''
    });
    setEditingId(patient.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Видалити пацієнта?')) return;
    try {
      await api.delete(`/patients/${id}`);
      fetchPatients();
    } catch (err) {
      console.error(err);
      alert('Помилка при видаленні пацієнта');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Керування пацієнтами</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            name="fullName"
            placeholder="Ім'я і прізвище"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          >
            <option value="">Оберіть користувача</option>
            {users.map(user => (
              <option key={user.username || user.id} value={user.id}>
                {user.username || `User #${user.id}`}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-success w-100" type="submit">
            {editingId ? 'Оновити' : 'Додати'}
          </button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Ім'я і прізвище</th>
              <th>Телефон</th>
              <th>ID Користувача</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.fullName}</td>
                <td>{p.phone}</td>
                <td>{p.userId || '—'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Редагувати
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Видалити
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPatientsPage;
