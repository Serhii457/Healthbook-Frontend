import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    api.get('/schedules')
      .then(response => setSchedules(response.data))
      .catch(error => console.error('Ошибка при получении расписаний:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Расписания</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Дата</th>
            <th>Время</th>
            <th>Доктор</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(schedule => (
            <tr key={schedule.id}>
              <td>{schedule.id}</td>
              <td>{schedule.date}</td>
              <td>{schedule.time}</td>
              <td>{schedule.doctorName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchedulePage;
