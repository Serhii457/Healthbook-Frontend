import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { Table, Button, Pagination, Container, Row, Col } from 'react-bootstrap';

const DoctorAllRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

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

  const sortByFullName = () => {
    const sorted = [...records].sort((a, b) => {
      const nameA = a.patientFullName.toLowerCase();
      const nameB = b.patientFullName.toLowerCase();
      if (nameA < nameB) return sortAsc ? -1 : 1;
      if (nameA > nameB) return sortAsc ? 1 : -1;
      return 0;
    });
    setRecords(sorted);
    setSortAsc(!sortAsc);
  };

  const totalPages = Math.ceil(records.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={10} lg={8}>
          <h2 className="text-center">Медичні записи по всім пацієнтам</h2>
        </Col>
      </Row>

      {records.length === 0 ? (
        <Row className="justify-content-center">
          <Col xs={12} md={8} className="text-center">
            <p>Немає медичних записів</p>
          </Col>
        </Row>
      ) : (
        <>
          <Row className="justify-content-center">
            <Col xs={12} md={11}>
              <div className="table-responsive">
                <Table striped bordered hover responsive className="align-middle text-center">
                  <thead className="table-dark">
                    <tr>
                      <th onClick={sortByFullName} style={{ cursor: 'pointer' }}>
                        Пацієнт {sortAsc ? '↑' : '↓'}
                      </th>
                      <th>Телефон</th>
                      <th>Дата</th>
                      <th>Діагноз</th>
                      <th>Лікування</th>
                      <th>Дії</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.map(record => (
                      <tr key={record.id}>
                        <td>{record.patientFullName}</td>
                        <td>{record.patientPhone}</td>
                        <td>{record.date?.substring(0, 10)}</td>
                        <td>{record.diagnosis}</td>
                        <td>{record.comment}</td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(record.id)}
                          >
                            Видалити
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center mt-3">
            <Col xs="auto">
              <Pagination>{paginationItems}</Pagination>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default DoctorAllRecordsPage;
