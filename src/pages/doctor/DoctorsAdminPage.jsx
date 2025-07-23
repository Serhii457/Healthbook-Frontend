import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const DoctorsAdminPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    specializationId: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    fetchDoctors();
    fetchSpecializations();
  }, []);

  const fetchDoctors = async () => {
    const res = await api.get('/doctors');
    setDoctors(res.data);
  };

  const fetchSpecializations = async () => {
    const res = await api.get('/specializations');
    setSpecializations(res.data);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/doctors/${editingId}`, formData);
      } else {
        await api.post('/doctors', formData);
      }
      fetchDoctors();
      setFormData({ fullName: '', phone: '', specializationId: '' });
      setEditingId(null);
    } catch (err) {
      alert('Помилка при збереженні лікаря');
    }
  };

  const handleEdit = (doctor) => {
    setFormData({
      fullName: doctor.fullName,
      phone: doctor.phone,
      specializationId: doctor.specialization?.id || ''
    });
    setEditingId(doctor.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Видалити лікаря?')) return;
    try {
      await api.delete(`/doctors/${id}`);
      fetchDoctors();
    } catch (err) {
      alert('Помилка при видаленні');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Керування лікарями</h1>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="ПІБ"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Телефон"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            name="specializationId"
            value={formData.specializationId}
            onChange={handleChange}
            required
          >
            <option value="">Оберіть спеціалізацію</option>
            {specializations.map(spec => (
              <option key={spec.id} value={spec.id}>{spec.name}</option>
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
              <th>ПІБ</th>
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
                <td>{doc.specialization?.name || '—'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(doc)}
                  >
                    Редагувати
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(doc.id)}
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

export default DoctorsAdminPage;
