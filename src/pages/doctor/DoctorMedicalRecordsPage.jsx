// import React, { useEffect, useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import api from '../../api/axiosConfig';

// const DoctorMedicalRecordsPage = () => {
//   const { patientId } = useParams();
//   const location = useLocation();
//   const patientName = location.state?.patientName;
//   const [diagnosis, setDiagnosis] = useState('');
//   const [comment, setComment] = useState('');
//   const [saving, setSaving] = useState(false);
//   const [records, setRecords] = useState([]);
//   const [editingRecordId, setEditingRecordId] = useState(null);
//   const [editDiagnosis, setEditDiagnosis] = useState('');
//   const [editComment, setEditComment] = useState('');

//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');

//   useEffect(() => {
//     fetchRecords();
//   }, [patientId]);

//   const fetchRecords = () => {
//     if (!patientId) return;
//     api.get(`/medical-records/patient/${patientId}`)
//       .then((res) => setRecords(res.data))
//       .catch((err) => console.error(err));
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await api.post('/medical-records', {
//         patientId: Number(patientId),
//         diagnosis,
//         comment,
//       });
//       setDiagnosis('');
//       setComment('');
//       alert('Запис збережено');
//       fetchRecords();
//     } catch (error) {
//       console.error('Помилка збереження:', error);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const cancelEdit = () => {
//     setEditingRecordId(null);
//     setEditDiagnosis('');
//     setEditComment('');
//   };

//   const saveEdit = async () => {
//     if (!editingRecordId) return;
//     try {
//       await api.put(`/medical-records/${editingRecordId}`, {
//         patientId: Number(patientId),
//         diagnosis: editDiagnosis,
//         comment: editComment,
//       });
//       alert('Запис оновлено');
//       cancelEdit();
//       fetchRecords();
//     } catch (error) {
//       console.error('Помилка оновлення:', error);
//       alert('Не вдалося оновити запис');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Ви впевнені, що хочете видалити цей запис?')) return;
//     try {
//       await api.delete(`/medical-records/${id}`);
//       alert('Запис видалено');
//       fetchRecords();
//     } catch (error) {
//       console.error('Помилка видалення:', error);
//       alert('Не вдалося видалити запис');
//     }
//   };

//   const formatDate = (isoString) => {
//     if (!isoString) return '—';
//     const date = new Date(isoString);
//     return date.toLocaleDateString('uk-UA', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   // Фильтрация записей по дате
//   const filteredRecords = records.filter((rec) => {
//     if (!rec.date) return false;
//     const recDate = new Date(rec.date);
//     if (dateFrom) {
//       const from = new Date(dateFrom);
//       if (recDate < from) return false;
//     }
//     if (dateTo) {
//       const to = new Date(dateTo);
//       to.setHours(23,59,59,999);
//       if (recDate > to) return false;
//     }
//     return true;
//   });

//   return (
//     <div className="container mt-4">
//       <h3>Зробити запис пацієнту: {patientName || `#${patientId}`}</h3>

//       <div className="mb-3">
//         <label>Діагноз</label>
//         <input
//           type="text"
//           className="form-control"
//           value={diagnosis}
//           onChange={(e) => setDiagnosis(e.target.value)}
//         />
//       </div>

//       <div className="mb-3">
//         <label>Лікування</label>
//         <textarea
//           className="form-control"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//       </div>

//       <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
//         {saving ? 'Збереження...' : 'Зберегти'}
//       </button>

//       <h5 className="mt-5">Фільтр по датах:</h5>
//       <div className="row mb-3 g-3 align-items-center">
//         <div className="col-auto">
//           <label htmlFor="dateFrom" className="col-form-label">Дата з:</label>
//         </div>
//         <div className="col-auto">
//           <input
//             id="dateFrom"
//             type="date"
//             className="form-control"
//             value={dateFrom}
//             onChange={(e) => setDateFrom(e.target.value)}
//           />
//         </div>
//         <div className="col-auto">
//           <label htmlFor="dateTo" className="col-form-label">Дата по:</label>
//         </div>
//         <div className="col-auto">
//           <input
//             id="dateTo"
//             type="date"
//             className="form-control"
//             value={dateTo}
//             onChange={(e) => setDateTo(e.target.value)}
//           />
//         </div>
//         <div className="col-auto">
//           <button className="btn btn-secondary" onClick={() => { setDateFrom(''); setDateTo(''); }}>
//             Скинути фільтр
//           </button>
//         </div>
//       </div>

//       <h5 className="mt-5">Існуючі записи:</h5>

//       {filteredRecords.length > 0 ? (
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover table-striped align-middle mt-3">
//             <thead className="table-primary">
//               <tr>
//                 <th style={{ width: '140px', minWidth: '120px', textAlign: 'center' }}>Дата</th>
//                 <th>Діагноз</th>
//                 <th>Лікування</th>
//                 <th style={{ width: '200px' }}>Дії</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredRecords.map((rec) => (
//                 <tr key={rec.id}>
//                   <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
//                     {formatDate(rec.date)}
//                   </td>
//                   <td>{rec.diagnosis || '—'}</td>
//                   <td>{rec.comment || '—'}</td>
//                   <td className="text-center">
//                     <button
//                       className="btn btn-sm btn-info me-2"
//                       onClick={() => startEdit(rec)}
//                       title="Редагувати запис"
//                     >
//                       Редагувати
//                     </button>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleDelete(rec.id)}
//                       title="Видалити запис"
//                     >
//                       Видалити
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>Записів поки немає</p>
//       )}
//       {editingRecordId && (
//         <div className="card p-3 mt-4">
//           <h5>Редагування запису #{editingRecordId}</h5>
//           <div className="mb-3">
//             <label>Діагноз</label>
//             <input
//               type="text"
//               className="form-control"
//               value={editDiagnosis}
//               onChange={(e) => setEditDiagnosis(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label>Лікування</label>
//             <textarea
//               className="form-control"
//               value={editComment}
//               onChange={(e) => setEditComment(e.target.value)}
//             />
//           </div>
//           <button className="btn btn-success me-2" onClick={saveEdit}>
//             Зберегти зміни
//           </button>
//           <button className="btn btn-secondary" onClick={cancelEdit}>
//             Скасувати
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorMedicalRecordsPage;


// import React, { useEffect, useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import api from '../../api/axiosConfig';

// const DoctorMedicalRecordsPage = () => {
//   const { patientId } = useParams();
//   const location = useLocation();
//   const patientName = location.state?.patientName;

//   const [diagnosis, setDiagnosis] = useState('');
//   const [comment, setComment] = useState('');
//   const [saving, setSaving] = useState(false);
//   const [records, setRecords] = useState([]);

//   const [editingRecordId, setEditingRecordId] = useState(null);
//   const [editDiagnosis, setEditDiagnosis] = useState('');
//   const [editComment, setEditComment] = useState('');
//   const [editSaving, setEditSaving] = useState(false);

//   useEffect(() => {
//     fetchRecords();
//   }, [patientId]);

//   const fetchRecords = () => {
//     if (!patientId) return;
//     api.get(`/medical-records/patient/${patientId}`)
//       .then((res) => setRecords(res.data))
//       .catch((err) => console.error(err));
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await api.post('/medical-records', {
//         patientId: Number(patientId),
//         diagnosis,
//         comment,
//       });
//       setDiagnosis('');
//       setComment('');
//       alert('Запис збережено');
//       fetchRecords();
//     } catch (error) {
//       console.error('Помилка збереження:', error);
//       alert('Не вдалося зберегти запис');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Ви впевнені, що хочете видалити цей запис?')) return;
//     try {
//       await api.delete(`/medical-records/${id}`);
//       alert('Запис видалено');
//       fetchRecords();
//       if (editingRecordId === id) cancelEdit();
//     } catch (error) {
//       console.error('Помилка видалення:', error);
//       alert('Не вдалося видалити запис');
//     }
//   };

//   const startEdit = (rec) => {
//     setEditingRecordId(rec.id);
//     setEditDiagnosis(rec.diagnosis || '');
//     setEditComment(rec.comment || '');
//     window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокрутка к форме
//   };

//   const cancelEdit = () => {
//     setEditingRecordId(null);
//     setEditDiagnosis('');
//     setEditComment('');
//   };

//   const saveEdit = async () => {
//     if (!editingRecordId) return;
//     setEditSaving(true);
//     try {
//       await api.put(`/medical-records/${editingRecordId}`, {
//         patientId: Number(patientId),
//         diagnosis: editDiagnosis,
//         comment: editComment,
//       });
//       alert('Запис оновлено');
//       cancelEdit();
//       fetchRecords();
//     } catch (error) {
//       console.error('Помилка оновлення:', error);
//       alert('Не вдалося оновити запис');
//     } finally {
//       setEditSaving(false);
//     }
//   };

//   const formatDate = (isoString) => {
//     if (!isoString) return '—';
//     const date = new Date(isoString);
//     return date.toLocaleDateString('uk-UA', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-4">Зробити запис пацієнту: {patientName || `#${patientId}`}</h3>

//       {/* Форма создания / редактирования */}
//       <div className="card p-3 mb-4">
//         <h5>{editingRecordId ? `Редагування запису #${editingRecordId}` : 'Новий запис'}</h5>

//         <div className="mb-3">
//           <label className="form-label">Діагноз</label>
//           <input
//             type="text"
//             className="form-control"
//             value={editingRecordId ? editDiagnosis : diagnosis}
//             onChange={(e) =>
//               editingRecordId ? setEditDiagnosis(e.target.value) : setDiagnosis(e.target.value)
//             }
//             placeholder="Введіть діагноз"
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Лікування</label>
//           <textarea
//             className="form-control"
//             value={editingRecordId ? editComment : comment}
//             onChange={(e) =>
//               editingRecordId ? setEditComment(e.target.value) : setComment(e.target.value)
//             }
//             placeholder="Введіть лікування"
//             rows={3}
//           />
//         </div>

//         {editingRecordId ? (
//           <>
//             <button
//               className="btn btn-success me-2"
//               onClick={saveEdit}
//               disabled={editSaving}
//             >
//               {editSaving ? 'Збереження...' : 'Зберегти зміни'}
//             </button>
//             <button className="btn btn-secondary" onClick={cancelEdit} disabled={editSaving}>
//               Скасувати
//             </button>
//           </>
//         ) : (
//           <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
//             {saving ? 'Збереження...' : 'Зберегти'}
//           </button>
//         )}
//       </div>

//       <h5>Існуючі записи:</h5>
//       {records.length > 0 ? (
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover table-striped align-middle">
//             <thead className="table-primary">
//               <tr>
//                 <th style={{ width: '130px', textAlign: 'center' }}>Дата</th>
//                 <th>Діагноз</th>
//                 <th>Лікування</th>
//                 <th style={{ width: '150px', textAlign: 'center' }}>Дії</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((rec) => (
//                 <tr key={rec.id}>
//                   <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
//                     {formatDate(rec.date)}
//                   </td>
//                   <td>{rec.diagnosis || '—'}</td>
//                   <td>{rec.comment || '—'}</td>
//                   <td className="text-center">
//                     <button
//                       className="btn btn-sm btn-info me-2"
//                       onClick={() => startEdit(rec)}
//                       title="Редагувати запис"
//                     >
//                       Редагувати
//                     </button>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleDelete(rec.id)}
//                       title="Видалити запис"
//                     >
//                       Видалити
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>Записів поки немає</p>
//       )}
//     </div>
//   );
// };

// export default DoctorMedicalRecordsPage;


// import React, { useEffect, useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import api from '../../api/axiosConfig';

// const DoctorMedicalRecordsPage = () => {
//   const { patientId } = useParams();
//   const location = useLocation();
//   const patientName = location.state?.patientName;

//   const [diagnosis, setDiagnosis] = useState('');
//   const [comment, setComment] = useState('');
//   const [saving, setSaving] = useState(false);
//   const [records, setRecords] = useState([]);

//   const [editingRecordId, setEditingRecordId] = useState(null);
//   const [editDiagnosis, setEditDiagnosis] = useState('');
//   const [editComment, setEditComment] = useState('');
//   const [editSaving, setEditSaving] = useState(false);

//   useEffect(() => {
//     fetchRecords();
//   }, [patientId]);

//   const fetchRecords = () => {
//     if (!patientId) return;
//     api.get(`/medical-records/patient/${patientId}`)
//       .then((res) => setRecords(res.data))
//       .catch((err) => console.error(err));
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await api.post('/medical-records', {
//         patientId: Number(patientId),
//         diagnosis,
//         comment,
//       });
//       setDiagnosis('');
//       setComment('');
//       alert('Запис збережено');
//       fetchRecords();
//     } catch (error) {
//       console.error('Помилка збереження:', error);
//       alert('Не вдалося зберегти запис');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Ви впевнені, що хочете видалити цей запис?')) return;
//     try {
//       await api.delete(`/medical-records/${id}`);
//       alert('Запис видалено');
//       fetchRecords();
//       if (editingRecordId === id) cancelEdit();
//     } catch (error) {
//       console.error('Помилка видалення:', error);
//       alert('Не вдалося видалити запис');
//     }
//   };

//   const startEdit = (rec) => {
//     setEditingRecordId(rec.id);
//     setEditDiagnosis(rec.diagnosis || '');
//     setEditComment(rec.comment || '');
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const cancelEdit = () => {
//     setEditingRecordId(null);
//     setEditDiagnosis('');
//     setEditComment('');
//   };

//   const saveEdit = async () => {
//     if (!editingRecordId) return;
//     setEditSaving(true);
//     try {
//       await api.put(`/medical-records/${editingRecordId}`, {
//         patientId: Number(patientId),
//         diagnosis: editDiagnosis,
//         comment: editComment,
//       });
//       alert('Запис оновлено');
//       cancelEdit();
//       fetchRecords();
//     } catch (error) {
//       console.error('Помилка оновлення:', error);
//       alert('Не вдалося оновити запис');
//     } finally {
//       setEditSaving(false);
//     }
//   };

//   const formatDate = (isoString) => {
//     if (!isoString) return '—';
//     const date = new Date(isoString);
//     return date.toLocaleDateString('uk-UA', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-4">Зробити запис пацієнту: {patientName || `#${patientId}`}</h3>

//       {/* Форма создания / редактирования, с ограниченной шириной */}
//       <div
//         className="card p-4 mb-4 mx-auto"
//         style={{ maxWidth: '600px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
//       >
//         <h5 className="mb-3">{editingRecordId ? `Редагування запису #${editingRecordId}` : 'Новий запис'}</h5>

//         <div className="mb-3">
//           <label className="form-label fw-semibold">Діагноз</label>
//           <input
//             type="text"
//             className="form-control"
//             value={editingRecordId ? editDiagnosis : diagnosis}
//             onChange={(e) =>
//               editingRecordId ? setEditDiagnosis(e.target.value) : setDiagnosis(e.target.value)
//             }
//             placeholder="Введіть діагноз"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="form-label fw-semibold">Лікування</label>
//           <textarea
//             className="form-control"
//             value={editingRecordId ? editComment : comment}
//             onChange={(e) =>
//               editingRecordId ? setEditComment(e.target.value) : setComment(e.target.value)
//             }
//             placeholder="Введіть лікування"
//             rows={4}
//           />
//         </div>

//         <div className="d-flex justify-content-end gap-2">
//           {editingRecordId ? (
//             <>
//               <button
//                 className="btn btn-success px-4"
//                 onClick={saveEdit}
//                 disabled={editSaving}
//               >
//                 {editSaving ? 'Збереження...' : 'Зберегти зміни'}
//               </button>
//               <button
//                 className="btn btn-outline-secondary px-4"
//                 onClick={cancelEdit}
//                 disabled={editSaving}
//               >
//                 Скасувати
//               </button>
//             </>
//           ) : (
//             <button
//               className="btn btn-primary px-5"
//               onClick={handleSave}
//               disabled={saving}
//             >
//               {saving ? 'Збереження...' : 'Зберегти'}
//             </button>
//           )}
//         </div>
//       </div>

//       <h5>Існуючі записи:</h5>
//       {records.length > 0 ? (
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover table-striped align-middle">
//             <thead className="table-primary">
//               <tr>
//                 <th style={{ width: '130px', textAlign: 'center' }}>Дата</th>
//                 <th>Діагноз</th>
//                 <th>Лікування</th>
//                 <th style={{ width: '180px', textAlign: 'center' }}>Дії</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((rec) => (
//                 <tr key={rec.id}>
//                   <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
//                     {formatDate(rec.date)}
//                   </td>
//                   <td>{rec.diagnosis || '—'}</td>
//                   <td>{rec.comment || '—'}</td>
//                   <td className="text-center">
//                     <button
//                       className="btn btn-sm btn-info me-2"
//                       onClick={() => startEdit(rec)}
//                       title="Редагувати запис"
//                       style={{ minWidth: '85px' }}
//                     >
//                       Редагувати
//                     </button>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleDelete(rec.id)}
//                       title="Видалити запис"
//                       style={{ minWidth: '85px' }}
//                     >
//                       Видалити
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>Записів поки немає</p>
//       )}
//     </div>
//   );
// };

// export default DoctorMedicalRecordsPage;


import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../../api/axiosConfig';

const DoctorMedicalRecordsPage = () => {
  const { patientId } = useParams();
  const location = useLocation();
  const patientName = location.state?.patientName;

  const [diagnosis, setDiagnosis] = useState('');
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);
  const [records, setRecords] = useState([]);

  const [editingRecordId, setEditingRecordId] = useState(null);
  const [editDiagnosis, setEditDiagnosis] = useState('');
  const [editComment, setEditComment] = useState('');
  const [editSaving, setEditSaving] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, [patientId]);

  const fetchRecords = () => {
    if (!patientId) return;
    api.get(`/medical-records/patient/${patientId}`)
      .then((res) => setRecords(res.data))
      .catch((err) => console.error(err));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post('/medical-records', {
        patientId: Number(patientId),
        diagnosis,
        comment,
      });
      setDiagnosis('');
      setComment('');
      alert('Запис збережено');
      fetchRecords();
    } catch (error) {
      console.error('Помилка збереження:', error);
      alert('Не вдалося зберегти запис');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цей запис?')) return;
    try {
      await api.delete(`/medical-records/${id}`);
      alert('Запис видалено');
      fetchRecords();
      if (editingRecordId === id) cancelEdit();
    } catch (error) {
      console.error('Помилка видалення:', error);
      alert('Не вдалося видалити запис');
    }
  };

  const startEdit = (rec) => {
    setEditingRecordId(rec.id);
    setEditDiagnosis(rec.diagnosis || '');
    setEditComment(rec.comment || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingRecordId(null);
    setEditDiagnosis('');
    setEditComment('');
  };

  const saveEdit = async () => {
    if (!editingRecordId) return;
    setEditSaving(true);
    try {
      await api.put(`/medical-records/${editingRecordId}`, {
        patientId: Number(patientId),
        diagnosis: editDiagnosis,
        comment: editComment,
      });
      alert('Запис оновлено');
      cancelEdit();
      fetchRecords();
    } catch (error) {
      console.error('Помилка оновлення:', error);
      alert('Не вдалося оновити запис');
    } finally {
      setEditSaving(false);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '—';
    const date = new Date(isoString);
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Зробити запис пацієнту: {patientName || `#${patientId}`}</h3>

      {/* Форма теперь растягивается на всю ширину таблицы */}
      <div className="card p-4 mb-4">
        <h5 className="mb-3">{editingRecordId ? `Редагування запису #${editingRecordId}` : 'Новий запис'}</h5>

        <div className="row g-3 mb-4">
          <div className="col-12">
            <label className="form-label fw-semibold">Діагноз</label>
            <input
              type="text"
              className="form-control"
              value={editingRecordId ? editDiagnosis : diagnosis}
              onChange={(e) =>
                editingRecordId ? setEditDiagnosis(e.target.value) : setDiagnosis(e.target.value)
              }
              placeholder="Введіть діагноз"
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold">Лікування</label>
            <textarea
              className="form-control"
              value={editingRecordId ? editComment : comment}
              onChange={(e) =>
                editingRecordId ? setEditComment(e.target.value) : setComment(e.target.value)
              }
              placeholder="Введіть лікування"
              rows={3}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 flex-wrap">
          {editingRecordId ? (
            <>
              <button
                className="btn btn-success px-4"
                onClick={saveEdit}
                disabled={editSaving}
              >
                {editSaving ? 'Збереження...' : 'Зберегти зміни'}
              </button>
              <button
                className="btn btn-outline-secondary px-4"
                onClick={cancelEdit}
                disabled={editSaving}
              >
                Скасувати
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary px-5"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Збереження...' : 'Зберегти'}
            </button>
          )}
        </div>
      </div>

      <h5>Існуючі записи:</h5>
      {records.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped align-middle">
            <thead className="table-primary">
              <tr>
                <th style={{ width: '130px', textAlign: 'center' }}>Дата</th>
                <th>Діагноз</th>
                <th>Лікування</th>
                <th style={{ width: '180px', textAlign: 'center' }}>Дії</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id}>
                  <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
                    {formatDate(rec.date)}
                  </td>
                  <td>{rec.diagnosis || '—'}</td>
                  <td>{rec.comment || '—'}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => startEdit(rec)}
                        title="Редагувати запис"
                        style={{ minWidth: '85px' }}
                      >
                        Редагувати
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(rec.id)}
                        title="Видалити запис"
                        style={{ minWidth: '85px' }}
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
      ) : (
        <p>Записів поки немає</p>
      )}
    </div>
  );
};

export default DoctorMedicalRecordsPage;
