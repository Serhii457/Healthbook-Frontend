import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import '../styles/AdminSpecializationsPage.css';

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
    <div className="px-4 py-5" style={{ width: '100vw', maxWidth: '100vw' }}>
      <h1 className="mb-4">Керування спеціалізаціями</h1>

      <form
        onSubmit={handleSubmit}
        className="row g-3 mb-4"
        style={{ maxWidth: '600px', width: '100%' }}
      >
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            placeholder="Назва спеціалізації"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-4">
          <button className="btn btn-success w-100" type="submit">
            {editingId ? 'Оновити' : 'Додати'}
          </button>
        </div>
      </form>

      <div className="d-flex flex-wrap" style={{ gap: '20px' }}>
        <div
          className="table-responsive flex-grow-1 table-container"
        >
          <table className="table table-bordered align-middle mb-0" style={{ width: '100%' }}>
            <thead className="table-dark">
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th>Назва</th>
                <th style={{ width: '100px' }}>Дії</th>
              </tr>
            </thead>
            <tbody>
              {specializations.map((spec, idx) => (
                <tr key={spec.id}>
                  <td>{idx + 1}</td>
                  <td>{spec.name}</td>
                  <td>
                    <div className="d-flex gap-2 justify-content-start">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEdit(spec)}
                        style={{ flex: '1 1 auto', minWidth: '40px' }}
                      >
                        Редагувати
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(spec.id)}
                        style={{ flex: '1 1 auto', minWidth: '40px' }}
                      >
                        Видалити
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="d-none d-md-block img-container"
          style={{ flexShrink: 0, minWidth: '250px' }}
        >
          <img
            src="/doctorPhoto.png"
            alt="Ілюстрація"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSpecializationsPage;
