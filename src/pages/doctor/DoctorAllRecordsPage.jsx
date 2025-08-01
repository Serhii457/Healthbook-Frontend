import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { Table, Button } from 'react-bootstrap';

const DoctorAllRecordsPage = () => {
  const [records, setRecords] = useState([]);

  const loadRecords = () => {
    api.get('/medical-records/doctor/all')
      .then(res => setRecords(res.data))
      .catch(err => console.error('Помилка при завантаженні записів:', err));
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей запис?')) {
      api.delete(`/medical-records/${id}`)
        .then(() => {
          setRecords(prev => prev.filter(record => record.id !== id));
        })
        .catch(err => console.error('Помилка при видаленні запису:', err));
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Медичні записи по всім пацієнтам</h2>

      {records.length === 0 ? (
        <p className="text-center">Немає медичних записів</p>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Пацієнт</th>
                <th>Телефон</th>
                <th>Дата</th>
                <th>Діагноз</th>
                <th>Лікування</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record.id}>
                  <td>{record.patientName}</td>
                  <td>{record.patientPhone}</td>
                  <td>{record.date?.substring(0, 10)}</td>
                  <td>{record.diagnosis}</td>
                  <td>{record.comment}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(record.id)}>
                      Видалити
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default DoctorAllRecordsPage;
