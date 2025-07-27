// import React, { useEffect, useState } from 'react';
// import api from '../../api/axiosConfig';

// const DoctorMedicalRecordsPage = () => {
//   const [records, setRecords] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const [formData, setFormData] = useState({
//     patientId: '',
//     diagnosis: '',
//     comment: ''
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [recordsRes, patientsRes] = await Promise.all([
//         api.get('/medical-records/my'),
//         api.get('/patients')
//       ]);
//       setRecords(recordsRes.data);
//       setPatients(patientsRes.data);
//       setError(null);
//     } catch (err) {
//       console.error('Помилка при завантаженні:', err);
//       setError('Не вдалося завантажити дані.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/medical-records', formData);
//       setFormData({ patientId: '', diagnosis: '', comment: '' });
//       setSuccess('Запис успішно додано');
//       fetchData();
//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       alert('Помилка при додаванні запису');
//     }
//   };

//   const sortedRecords = [...records].sort((a, b) => new Date(b.date) - new Date(a.date));

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4">Мої медичні записи</h2>

//       {loading ? (
//         <div className="text-center py-5">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Завантаження...</span>
//           </div>
//         </div>
//       ) : error ? (
//         <div className="alert alert-danger">{error}</div>
//       ) : (
//         <>
//           {success && <div className="alert alert-success">{success}</div>}

//           {sortedRecords.length === 0 ? (
//             <p>Записів поки немає.</p>
//           ) : (
//             <div className="table-responsive mb-4">
//               <table className="table table-striped align-middle">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Пацієнт</th>
//                     <th>Діагноз</th>
//                     <th>Дата</th>
//                     <th>Коментар</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sortedRecords.map(record => (
//                     <tr key={record.id}>
//                       <td>{record.patient?.fullName || '—'}</td>
//                       <td>{record.diagnosis}</td>
//                       <td>{new Date(record.date).toLocaleDateString()}</td>
//                       <td>{record.comment || '—'}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           <h4>Додати новий запис</h4>
//           <form onSubmit={handleSubmit} className="row g-3">
//             <div className="col-md-4">
//               <select
//                 className="form-select"
//                 name="patientId"
//                 value={formData.patientId}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Оберіть пацієнта</option>
//                 {patients.map(p => (
//                   <option key={p.id} value={p.id}>
//                     {p.fullName} (ID: {p.id})
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="col-md-4">
//               <input
//                 type="text"
//                 className="form-control"
//                 name="diagnosis"
//                 placeholder="Діагноз"
//                 value={formData.diagnosis}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-4">
//               <input
//                 type="text"
//                 className="form-control"
//                 name="comment"
//                 placeholder="Коментар"
//                 value={formData.comment}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-12">
//               <button className="btn btn-success" type="submit">
//                 Додати запис
//               </button>
//             </div>
//           </form>
//         </>
//       )}
//     </div>
//   );
// };

// export default DoctorMedicalRecordsPage;


import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const DoctorMedicalRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    patientId: '',
    diagnosis: '',
    comment: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [recordsRes, patientsRes] = await Promise.all([
        api.get('/medical-records/my'), // Возвращает записи доктора
        api.get('/patients'),
      ]);
      setRecords(recordsRes.data);
      setPatients(patientsRes.data);
      setError(null);
    } catch (err) {
      console.error('Помилка при завантаженні:', err);
      setError('Не вдалося завантажити дані.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.patientId || !formData.diagnosis) {
        alert('Будь ласка, заповніть всі обов’язкові поля');
        return;
      }

      await api.post('/medical-records', formData);
      setFormData({ patientId: '', diagnosis: '', comment: '' });
      setSuccess('Запис успішно додано');
      fetchData();

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Помилка при додаванні запису:', err);
      alert('Помилка при додаванні запису');
    }
  };

  // Сортировка по дате (по убыванию)
  const sortedRecords = [...records].sort((a, b) => new Date(b.date || b.recordDate) - new Date(a.date || a.recordDate));

  return (
    <div className="container py-5">
      <h2 className="mb-4">Мої медичні записи (Лікар)</h2>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <span className="visually-hidden">Завантаження...</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          {success && <div className="alert alert-success">{success}</div>}

          {sortedRecords.length === 0 ? (
            <p>Записів поки немає.</p>
          ) : (
            <div className="table-responsive mb-4">
              <table className="table table-striped align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Пацієнт</th>
                    <th>Діагноз</th>
                    <th>Дата</th>
                    <th>Коментар</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRecords.map(record => (
                    <tr key={record.id}>
                      <td>{record.patient?.fullName || '—'}</td>
                      <td>{record.diagnosis || '—'}</td>
                      <td>{new Date(record.date || record.recordDate).toLocaleDateString('uk-UA')}</td>
                      <td>{record.comment || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <h4>Додати новий запис</h4>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <select
                className="form-select"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                required
              >
                <option value="">Оберіть пацієнта</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} (ID: {p.id})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="diagnosis"
                placeholder="Діагноз"
                value={formData.diagnosis}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                name="comment"
                placeholder="Коментар"
                value={formData.comment}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <button className="btn btn-success" type="submit">
                Додати запис
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default DoctorMedicalRecordsPage;
