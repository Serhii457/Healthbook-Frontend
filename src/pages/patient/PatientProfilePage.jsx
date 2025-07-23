import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const PatientProfilePage = () => {
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    try {
      const res = await api.get('/patients/my-profile');
      setPatient(res.data);
      setFormData({
        fullName: res.data.fullName || '',
        phone: res.data.phone || '',
        email: res.data.email || ''
      });
      setError(null);
    } catch (err) {
      console.error('Помилка при завантаженні профілю:', err);
      setError('Не вдалося завантажити профіль.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEditToggle = () => {
    setEditing(!editing);
    setSuccess(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/patients/my-profile', formData);
      setSuccess('Профіль оновлено успішно');
      setEditing(false);
      fetchPatient();
    } catch (err) {
      console.error('Помилка при оновленні профілю:', err);
      setError('Не вдалося оновити профіль');
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Завантаження...</span>
        </div>
      </div>
    );
  }

  if (error && !editing) {
    return <div className="container py-5 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Профіль пацієнта</h2>

      {success && <div className="alert alert-success">{success}</div>}

      {!editing ? (
        <div>
          <p><strong>ПІБ:</strong> {patient.fullName}</p>
          <p><strong>Телефон:</strong> {patient.phone || '—'}</p>
          <p><strong>Email:</strong> {patient.email || '—'}</p>
          <button className="btn btn-primary" onClick={handleEditToggle}>Редагувати</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">ПІБ</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Телефон</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success me-2">Зберегти</button>
          <button type="button" className="btn btn-secondary" onClick={handleEditToggle}>Відмінити</button>
        </form>
      )}
    </div>
  );
};

export default PatientProfilePage;
