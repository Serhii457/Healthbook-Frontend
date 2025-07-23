import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./styles/LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{ padding: '15px' }}
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: '400px', width: '100%', borderRadius: '12px' }}
      >
        <h2 className="mb-4 text-center">Вхід</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Логін
            </label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Введіть логін"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Введіть пароль"
            />
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <button className="btn btn-primary w-100" type="submit">
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
}
