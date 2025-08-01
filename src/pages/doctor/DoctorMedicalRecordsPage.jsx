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
