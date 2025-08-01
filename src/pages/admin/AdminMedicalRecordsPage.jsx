import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { Table, Button, Pagination, Container, Row, Col } from 'react-bootstrap';

const AdminMedicalRecordsPage = () => {
  const [recordsPage, setRecordsPage] = useState({
    content: [],
    totalPages: 0,
    number: 0,
  });
  const [sortField, setSortField] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const pageSize = 8;

  const fetchRecords = async (page = 0, sortFieldParam = sortField, sortDirParam = sortDir) => {
    try {
      const res = await api.get('/medical-records/admin/all', {
        params: {
          page,
          size: pageSize,
          sortField: sortFieldParam,
          sortDir: sortDirParam,
        },
      });
      setRecordsPage(res.data);
    } catch (error) {
      console.error('Помилка при завантаженні медичних записів:', error);
    }
  };

  useEffect(() => {
    fetchRecords(recordsPage.number, sortField, sortDir);
  }, [sortField, sortDir]);

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цей запис?')) return;
    try {
      await api.delete(`/medical-records/${id}`);
      fetchRecords(recordsPage.number, sortField, sortDir);
    } catch (error) {
      console.error('Помилка при видаленні запису:', error);
    }
  };

  const handlePageChange = (page) => {
    fetchRecords(page, sortField, sortDir);
  };

  const toggleSort = (field) => {
    if (field === sortField) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const renderSortArrow = (field) => {
    if (field !== sortField) return null;
    return sortDir === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={10} lg={8}>
          <h2 className="text-center">Медичні записи усіх пацієнтів</h2>
        </Col>
      </Row>

      {recordsPage.content.length === 0 ? (
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
                      <th
                        onClick={() => toggleSort('patientFullName')}
                        style={{ cursor: 'pointer' }}
                      >
                        Пацієнт{renderSortArrow('patientFullName')}
                      </th>
                      <th>Телефон</th>
                      <th
                        onClick={() => toggleSort('date')}
                        style={{ cursor: 'pointer' }}
                      >
                        Дата{renderSortArrow('date')}
                      </th>
                      <th>Діагноз</th>
                      <th>Лікування</th>
                      <th>Дії</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recordsPage.content.map(record => (
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
              <Pagination>
                {[...Array(recordsPage.totalPages)].map((_, idx) => (
                  <Pagination.Item
                    key={idx}
                    active={idx === recordsPage.number}
                    onClick={() => handlePageChange(idx)}
                  >
                    {idx + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default AdminMedicalRecordsPage;