// // import React, { useEffect, useState } from 'react';
// // import api from '../../api/axiosConfig';

// // const AdminPatientsPage = () => {
// //   const [requests, setRequests] = useState([]);

// //   useEffect(() => {
// //     api.get('/appointment-requests')
// //       .then(res => setRequests(res.data))
// //       .catch(err => {
// //         console.error('Помилка при завантаженні заявок:', err);
// //         alert('Не вдалося завантажити дані');
// //       });
// //   }, []);

// //   return (
// //     <div className="container py-5">
// //       <h2 className="mb-4">Заявки на прийом</h2>
// //       <table className="table table-bordered">
// //         <thead className="table-light">
// //           <tr>
// //             <th>ПІБ</th>
// //             <th>Телефон</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {requests.map((r, idx) => (
// //             <tr key={r.id}>
// //               <td>{r.fullName}</td>
// //               <td>{r.phone}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default AdminPatientsPage;



// //add button delete
// // import React, { useEffect, useState } from 'react';
// // import api from '../../api/axiosConfig';

// // const AdminPatientsPage = () => {
// //   const [requests, setRequests] = useState([]);

// //   useEffect(() => {
// //     fetchRequests();
// //   }, []);

// //   const fetchRequests = async () => {
// //     try {
// //       const res = await api.get('/appointment-requests');
// //       setRequests(res.data);
// //     } catch (error) {
// //       console.error('Помилка при завантаженні заявок:', error);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm('Ви впевнені, що хочете видалити цю заявку?')) return;
// //     try {
// //       await api.delete(`/appointment-requests/${id}`);
// //       setRequests(prev => prev.filter(r => r.id !== id));
// //     } catch (error) {
// //       console.error('Помилка при видаленні заявки:', error);
// //     }
// //   };

// //   return (
// //     <div className="container py-5">
// //       <h2 className="text-center mb-4">Пацієнти, які записались на прийом</h2>

// //       <table className="table table-bordered table-hover">
// //         <thead className="table-light">
// //           <tr>
// //             <th>ПІБ</th>
// //             <th>Телефон</th>
// //             <th>Лікар</th>
// //             <th>Дата</th>
// //             <th>Час</th>
// //             <th>Коментар</th>
// //             <th>Статус</th>
// //             <th>Дії</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {requests.length === 0 ? (
// //             <tr>
// //               <td colSpan="8" className="text-center">Немає заявок</td>
// //             </tr>
// //           ) : (
// //             requests.map(req => (
// //               <tr key={req.id}>
// //                 <td>{req.fullName}</td>
// //                 <td>{req.phone}</td>
// //                 <td>{req.doctor?.fullName || '—'}</td>
// //                 <td>{req.date || '—'}</td>
// //                 <td>{req.time || '—'}</td>
// //                 <td>{req.note || '—'}</td>
// //                 <td>{req.status}</td>
// //                 <td>
// //                   <button
// //                     className="btn btn-sm btn-danger"
// //                     onClick={() => handleDelete(req.id)}
// //                   >
// //                     Видалити
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))
// //           )}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default AdminPatientsPage;


// //add sort

// import React, { useEffect, useState } from 'react';
// import api from '../../api/axiosConfig';

// const AdminPatientsPage = () => {
//   const [requests, setRequests] = useState([]);
//   const [sortOrder, setSortOrder] = useState('asc');

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const res = await api.get('/appointment-requests');
//       setRequests(res.data);
//     } catch (error) {
//       console.error('Помилка при завантаженні заявок:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Ви впевнені, що хочете видалити цю заявку?')) return;
//     try {
//       await api.delete(`/appointment-requests/${id}`);
//       setRequests(prev => prev.filter(r => r.id !== id));
//     } catch (error) {
//       console.error('Помилка при видаленні заявки:', error);
//     }
//   };

//   const handleSortByDate = () => {
//     const sorted = [...requests].sort((a, b) => {
//       const dateA = a.date || '';
//       const dateB = b.date || '';
//       if (sortOrder === 'asc') {
//         return dateA.localeCompare(dateB);
//       } else {
//         return dateB.localeCompare(dateA);
//       }
//     });
//     setRequests(sorted);
//     setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4">Пацієнти, які записались на прийом</h2>

//       <div className="text-end mb-3">
//         <button className="btn btn-outline-secondary" onClick={handleSortByDate}>
//           Сортувати за датою {sortOrder === 'asc' ? '↑' : '↓'}
//         </button>
//       </div>

//       <table className="table table-bordered table-hover">
//         <thead className="table-light">
//           <tr>
//             <th>ПІБ</th>
//             <th>Телефон</th>
//             <th>Лікар</th>
//             <th>Дата</th>
//             <th>Час</th>
//             <th>Коментар</th>
//             <th>Статус</th>
//             <th>Дії</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requests.length === 0 ? (
//             <tr>
//               <td colSpan="8" className="text-center">Немає заявок</td>
//             </tr>
//           ) : (
//             requests.map(req => (
//               <tr key={req.id}>
//                 <td>{req.fullName}</td>
//                 <td>{req.phone}</td>
//                 <td>{req.doctor?.fullName || '—'}</td>
//                 <td>{req.date || '—'}</td>
//                 <td>{req.time || '—'}</td>
//                 <td>{req.note || '—'}</td>
//                 <td>{req.status}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-danger"
//                     onClick={() => handleDelete(req.id)}
//                   >
//                     Видалити
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminPatientsPage;

//add sort data time

import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const AdminPatientsPage = () => {
  const [requests, setRequests] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/appointment-requests');
      setRequests(res.data);
    } catch (error) {
      console.error('Помилка при завантаженні заявок:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цю заявку?')) return;
    try {
      await api.delete(`/appointment-requests/${id}`);
      setRequests(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('Помилка при видаленні заявки:', error);
    }
  };

  const handleSortByDate = () => {
    const sorted = [...requests].sort((a, b) => {
      const dateTimeA = new Date(`${a.date || ''}T${a.time || '00:00'}`);
      const dateTimeB = new Date(`${b.date || ''}T${b.time || '00:00'}`);
      return sortOrder === 'asc' ? dateTimeA - dateTimeB : dateTimeB - dateTimeA;
    });
    setRequests(sorted);
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Пацієнти, які записались на прийом</h2>

      <div className="text-end mb-3">
        <button className="btn btn-outline-secondary" onClick={handleSortByDate}>
          Сортувати за датою і часом {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ПІБ</th>
            <th>Телефон</th>
            <th>Лікар</th>
            <th>Дата</th>
            <th>Час</th>
            <th>Коментар</th>
            <th>Статус</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">Немає заявок</td>
            </tr>
          ) : (
            requests.map(req => (
              <tr key={req.id}>
                <td>{req.fullName}</td>
                <td>{req.phone}</td>
                <td>{req.doctor?.fullName || req.doctorName || '—'}</td>
                <td>{req.date || '—'}</td>
                <td>{req.time || '—'}</td>
                <td>{req.note || '—'}</td>
                <td>{req.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(req.id)}
                  >
                    Видалити
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPatientsPage;

