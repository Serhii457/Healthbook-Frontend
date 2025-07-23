import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const AdminSpecializationsPage = () => {
  const [specializations, setSpecializations] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSpecializations();
  }, []);

  const fetchSpecializations = async () => {
    try {
      const res = await api.get('/specializations');
      setSpecializations(res.data);
    } catch (err) {
      console.error('Помилка при завантаженні спеціалізацій:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/specializations/${editingId}`, formData);
      } else {
        await api.post('/specializations', formData);
      }
      setFormData({ name: '' });
      setEditingId(null);
      fetchSpecializations();
    } catch (err) {
      alert('Помилка при збереженні');
    }
  };

  const handleEdit = (spec) => {
    setFormData({ name: spec.name });
    setEditingId(spec.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Видалити спеціалізацію?')) return;
    try {
      await api.delete(`/specializations/${id}`);
      fetchSpecializations();
    } catch (err) {
      alert('Помилка при видаленні');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Керування спеціалізаціями</h1>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Назва спеціалізації"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-success w-100" type="submit">
            {editingId ? 'Оновити' : 'Додати'}
          </button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Назва</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {specializations.map((spec, idx) => (
              <tr key={spec.id}>
                <td>{idx + 1}</td>
                <td>{spec.name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(spec)}
                  >
                    Редагувати
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(spec.id)}
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

export default AdminSpecializationsPage;
