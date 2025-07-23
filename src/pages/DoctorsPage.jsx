import React, { useEffect, useRef, useState } from 'react';
import api from '../api/axiosConfig';
import './styles/DoctorsPage.css';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    doctorId: '',
    date: '',
    time: '',
    note: '',
  });

  const formRef = useRef(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [selectedDoctor]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setSelectedDoctor(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchDoctors = async () => {
    try {
      const res = await api.get('/doctors/public');
      setDoctors(res.data);
    } catch (err) {
      console.error('Помилка при завантаженні лікарів:', err);
    }
  };

  const handleOpenForm = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData((prev) => ({ ...prev, doctorId: doctor.id }));
    setError('');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      date: value,
      time: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedDoctor && formData.date) {
      const dayOfWeek = new Date(formData.date).toLocaleDateString('uk-UA', { weekday: 'long' });
      const matchedDay = selectedDoctor.schedule?.find(s =>
        s.day.toLowerCase() === dayOfWeek.toLowerCase()
      );
      if (!matchedDay) {
        setError(`Лікар не працює у цей день (${dayOfWeek})`);
        return;
      }
      const isTimeValid = matchedDay.times.includes(formData.time);
      if (!isTimeValid) {
        setError(`Оберіть інший час. Доступні години: ${matchedDay.times.join(', ')}`);
        return;
      }
    }

    try {
      await api.post('/appointments', formData);
      setSuccess(true);
      setFormData({
        fullName: '',
        phone: '',
        doctorId: '',
        date: '',
        time: '',
        note: '',
      });
      setError('');
    } catch (err) {
      console.error('Помилка при відправці заявки:', err);
      alert('Сталася помилка. Спробуйте ще раз.');
    }
  };

  return (
    <div className="doctors-page container py-5">
      <h1 className="text-center mb-4">Наші лікарі</h1>
      <p className="text-center mb-5">Кваліфіковані спеціалісти, які піклуються про ваше здоров’я.</p>

      <div className="row g-4">
        {doctors.map((doc) => (
          <div key={doc.id} className="col-12 col-md-4">
            <div className="card h-100 text-center shadow-sm doctor-card">
              <div className="doctor-photo">
                <img
                  src={doc.photoUrl || '/images/doctors/default.jpg'}
                  alt={`Фото лікаря ${doc.fullName}`}
                  className="img-fluid rounded-top doctor-photo-img"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{doc.fullName}</h5>
                <p className="card-text"><strong>Спеціалізація:</strong> {doc.specialization || 'Не вказано'}</p>
                <p className="card-text"><strong>Телефон:</strong> {doc.phone || 'Немає'}</p>
                <button className="btn-big-beauty mt-3" onClick={() => handleOpenForm(doc)}>
                  Записатись
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div
          ref={formRef}
          className="appointment-form bg-light p-4 rounded shadow-sm mt-5"
          id="appointment-form"
        >
          <h2 className="text-center mb-4">Запис на прийом</h2>

          {success && (
            <div className="alert alert-success text-center">
              Ваша заявка успішно відправлена!
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          <div className="alert alert-info text-center">
            Ви обрали лікаря: <strong>{selectedDoctor.fullName}</strong>
          </div>

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
                value={selectedDoctor ? selectedDoctor.id : formData.doctorId}
                onChange={handleChange}
                required
                disabled={!!selectedDoctor}
              >
                <option value="">-- Оберіть лікаря --</option>
                {doctors.map((doc) => (
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
              <button type="submit" className="btn-big-beauty mt-3 btn-lg px-5">
                Відправити заявку
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
