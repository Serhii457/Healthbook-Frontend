import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const AppointmentPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    doctorId: '',
    date: '',
    time: '',
    note: '',
  });
  const [availableTimes, setAvailableTimes] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    api.get('/doctors/public').then(res => setDoctors(res.data));
  }, []);

  useEffect(() => {
    if (formData.doctorId) {
      api.get(`/doctors/${formData.doctorId}/schedule`).then(res => {
        setSchedule(res.data);
        const doc = doctors.find(d => d.id === parseInt(formData.doctorId));
        setSelectedDoctor(doc || null);
      });
    } else {
      setSelectedDoctor(null);
    }
  }, [formData.doctorId, doctors]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDateChange = (e) => {
    handleChange(e);
    setFormData(prev => ({
      ...prev,
      time: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/appointments/public', formData);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);

      setFormData({
        fullName: '',
        phone: '',
        doctorId: '',
        date: '',
        time: '',
        note: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Помилка при відправці заявки');
    }
  };

  return (
    <div className="appointment-form bg-light p-4 rounded shadow-sm mt-5" id="appointment-form">
      <h2 className="text-center mb-4">Запис на прийом</h2>

      {success && (
        <div className="alert alert-success text-center">
          Ваша заявка успішно відправлена!
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {selectedDoctor && (
        <div className="alert alert-info text-center">
          Ви обрали лікаря: <strong>{selectedDoctor.fullName}</strong>
        </div>
      )}

      <form onSubmit={handleSubmit} className="row g-3">
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
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Лікар</label>
          <select
            className="form-select"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          >
            <option value="">-- Оберіть лікаря --</option>
            {doctors.map(doc => (
              <option key={doc.id} value={doc.id}>
                {doc.fullName} ({doc.specialization})
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Дата</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleDateChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Час</label>
          <select
            className="form-select"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            disabled={!formData.date}
          >
            <option value="">-- Оберіть час --</option>
            {(() => {
              if (!selectedDoctor || !formData.date) return null;
              const dayOfWeek = new Date(formData.date).toLocaleDateString('uk-UA', { weekday: 'long' });
              const matchedDay = selectedDoctor.schedule?.find(s =>
                s.day.toLowerCase() === dayOfWeek.toLowerCase()
              );
              if (!matchedDay) return <option disabled>Лікар не працює цього дня</option>;
              return matchedDay.times.map(time => (
                <option key={time} value={time}>{time}</option>
              ));
            })()}
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">Коментар (необов’язково)</label>
          <textarea
            className="form-control"
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary btn-lg px-5">
            Відправити заявку
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentPage;