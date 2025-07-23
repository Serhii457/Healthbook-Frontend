import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container text-center py-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Сторінку не знайдено.</p>
      <Link to="/" className="btn btn-primary">На головну</Link>
    </div>
  );
};

export default NotFoundPage;
