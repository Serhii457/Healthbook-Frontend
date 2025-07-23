import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const DoctorProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/doctors/my-profile');
      setProfile(res.data);
      setFormData({
        fullName: res.data.fullName || '',
        phone: res.data.phone || ''
      });
      setError(null);
    } catch (err) {
      setError('Не вдалося завантажити профіль');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/doctors/my-profile', formData);
      setSuccessMsg('Профіль успішно оновлено');
      setError(null);
    } catch (err) {
      setError('Помилка при збереженні профілю');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Мій профіль</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Завантаження...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label">ПІБ</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Телефон</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Спеціалізація</label>
              <input
                type="text"
                className="form-control"
                value={profile.specialization || '—'}
                disabled
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Збереження...' : 'Зберегти зміни'}
              </button>
            </div>
          </form>

          {successMsg && <div className="alert alert-success">{successMsg}</div>}
        </>
      )}
    </div>
  );
};

export default DoctorProfilePage;
