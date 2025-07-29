import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { Button, Modal, Table, Form } from 'react-bootstrap';

const AdminMedicalRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    diagnosis: '',
    recommendations: '',
    comment: '',
    appointmentId: '',
    patientId: '',
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await api.get('/records/page?page=0&size=100');
      setRecords(response.data.content);
    } catch (error) {
      console.error('Error fetching records', error);
    }
  };

  const handleShowModal = (record = null) => {
    if (record) {
      setEditingRecord(record);
      setFormData({
        diagnosis: record.diagnosis,
        recommendations: record.recommendations,
        comment: record.comment,
        appointmentId: record.appointmentId,
        patientId: record.patientId,
      });
    } else {
      setEditingRecord(null);
      setFormData({
        diagnosis: '',
        recommendations: '',
        comment: '',
        appointmentId: '',
        patientId: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editingRecord) {
        await api.put(`/records/${editingRecord.id}`, {
          ...formData,
          id: editingRecord.id,
        });
      } else {
        await api.post('/records', formData);
      }
      fetchRecords();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving record', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити запис?')) return;
    try {
      await api.delete(`/records/${id}`);
      fetchRecords();
    } catch (error) {
      console.error('Error deleting record', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Медичні записи</h2>
      <Button className="mb-3" onClick={() => handleShowModal()}>
        ➕ Додати запис
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Пацієнт</th>
            <th>Прийом</th>
            <th>Діагноз</th>
            <th>Рекомендації</th>
            <th>Коментар</th>
            <th>Створено</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.patientName}</td>
              <td>{record.appointmentDate}</td>
              <td>{record.diagnosis}</td>
              <td>{record.recommendations}</td>
              <td>{record.comment}</td>
              <td>{record.createdAt}</td>
              <td>
                <Button size="sm" onClick={() => handleShowModal(record)}>✏️</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(record.id)}>🗑️</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingRecord ? 'Редагувати запис' : 'Новий запис'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Діагноз</Form.Label>
              <Form.Control
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Рекомендації</Form.Label>
              <Form.Control
                name="recommendations"
                value={formData.recommendations}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Коментар</Form.Label>
              <Form.Control
                name="comment"
                value={formData.comment}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>ID прийому (appointmentId)</Form.Label>
              <Form.Control
                name="appointmentId"
                value={formData.appointmentId}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>ID пацієнта (patientId)</Form.Label>
              <Form.Control
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Скасувати</Button>
          <Button onClick={handleSubmit}>Зберегти</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminMedicalRecordsPage;


// import React, { useEffect, useState } from 'react';
// import api from '../../api/axiosConfig';
// import { Button, Modal, Table, Form } from 'react-bootstrap';

// const AdminMedicalRecordsPage = () => {
//   const [records, setRecords] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingRecord, setEditingRecord] = useState(null);
//   const [formData, setFormData] = useState({
//     diagnosis: '',
//     recommendations: '',
//     comment: '',
//     appointmentId: '',
//     patientId: '',
//   });

//   useEffect(() => {
//     fetchRecords();
//   }, []);

//   const fetchRecords = async () => {
//     try {
//       const response = await api.get('/records/page?page=0&size=100');
//       setRecords(response.data.content);
//     } catch (error) {
//       console.error('Error fetching records', error);
//     }
//   };

//   const handleShowModal = (record = null) => {
//     if (record) {
//       setEditingRecord(record);
//       setFormData({
//         diagnosis: record.diagnosis || '',
//         recommendations: record.recommendations || '',
//         comment: record.comment || '',
//         appointmentId: record.appointmentId || '',
//         patientId: record.patientId || '',
//       });
//     } else {
//       setEditingRecord(null);
//       setFormData({
//         diagnosis: '',
//         recommendations: '',
//         comment: '',
//         appointmentId: '',
//         patientId: '',
//       });
//     }
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       if (editingRecord) {
//         await api.put(`/records/${editingRecord.id}`, {
//           ...formData,
//           id: editingRecord.id,
//         });
//       } else {
//         await api.post('/records', formData);
//       }
//       fetchRecords();
//       handleCloseModal();
//     } catch (error) {
//       console.error('Error saving record', error);
//       alert('Помилка при збереженні запису');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Ви впевнені, що хочете видалити запис?')) return;
//     try {
//       await api.delete(`/records/${id}`);
//       fetchRecords();
//     } catch (error) {
//       console.error('Error deleting record', error);
//       alert('Помилка при видаленні запису');
//     }
//   };

//   // Форматируем даты красиво
//   const formatDate = (dateStr) => {
//     if (!dateStr) return '—';
//     return new Date(dateStr).toLocaleString('uk-UA', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Медичні записи (Адмін)</h2>
//       <Button className="mb-3" onClick={() => handleShowModal()}>
//         ➕ Додати запис
//       </Button>

//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Пацієнт</th>
//             <th>Прийом</th>
//             <th>Діагноз</th>
//             <th>Рекомендації</th>
//             <th>Коментар</th>
//             <th>Створено</th>
//             <th>Дії</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.length === 0 ? (
//             <tr><td colSpan="8" className="text-center">Записів немає</td></tr>
//           ) : (
//             records.map((record) => (
//               <tr key={record.id}>
//                 <td>{record.id}</td>
//                 <td>{record.patientName || '—'}</td>
//                 <td>{formatDate(record.appointmentDate)}</td>
//                 <td>{record.diagnosis || '—'}</td>
//                 <td>{record.recommendations || '—'}</td>
//                 <td>{record.comment || '—'}</td>
//                 <td>{formatDate(record.createdAt)}</td>
//                 <td>
//                   <Button size="sm" onClick={() => handleShowModal(record)}>✏️</Button>{' '}
//                   <Button variant="danger" size="sm" onClick={() => handleDelete(record.id)}>🗑️</Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>

//       <Modal show={showModal} onHide={handleCloseModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{editingRecord ? 'Редагувати запис' : 'Новий запис'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="diagnosis">
//               <Form.Label>Діагноз</Form.Label>
//               <Form.Control
//                 name="diagnosis"
//                 value={formData.diagnosis}
//                 onChange={handleChange}
//                 placeholder="Введіть діагноз"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="recommendations">
//               <Form.Label>Рекомендації</Form.Label>
//               <Form.Control
//                 name="recommendations"
//                 value={formData.recommendations}
//                 onChange={handleChange}
//                 placeholder="Рекомендації"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="comment">
//               <Form.Label>Коментар</Form.Label>
//               <Form.Control
//                 name="comment"
//                 value={formData.comment}
//                 onChange={handleChange}
//                 placeholder="Додаткові коментарі"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="appointmentId">
//               <Form.Label>ID прийому (appointmentId)</Form.Label>
//               <Form.Control
//                 name="appointmentId"
//                 value={formData.appointmentId}
//                 onChange={handleChange}
//                 placeholder="ID прийому"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="patientId">
//               <Form.Label>ID пацієнта (patientId)</Form.Label>
//               <Form.Control
//                 name="patientId"
//                 value={formData.patientId}
//                 onChange={handleChange}
//                 placeholder="ID пацієнта"
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>Скасувати</Button>
//           <Button variant="primary" onClick={handleSubmit}>Зберегти</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default AdminMedicalRecordsPage;
