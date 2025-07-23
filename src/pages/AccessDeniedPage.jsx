import React from 'react';
import { Link } from 'react-router-dom';

const AccessDeniedPage = () => {
  return (
    <div className="container text-center py-5">
      <h1 className="display-5">403</h1>
      <p className="lead">У вас немає доступу до цієї сторінки.</p>
      <Link to="/" className="btn btn-warning">Повернутись</Link>
    </div>
  );
};

export default AccessDeniedPage;
