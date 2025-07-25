import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;
  const role = user?.role;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavLinkClick = () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 px-4 sticky-top">
      <Link className="navbar-brand fs-4 fw-bold text-primary" to="/">HealthLife</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {[
            { to: '/', label: 'Головна', end: true },
            { to: '/about', label: 'Про нас' },
            { to: '/services', label: 'Послуги' },
            { to: '/doctors', label: 'Лікарі' },
            { to: '/prices', label: 'Прайс' },
            { to: '/contacts', label: 'Контакти' }
          ].map(({ to, label, end }) => (
            <li className="nav-item" key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  'nav-link px-3' + (isActive ? ' active fw-semibold text-info' : '')
                }
                onClick={handleNavLinkClick}
              >
                {label}
              </NavLink>
            </li>
          ))}

          {role === 'ADMIN' && (
            <>
              <li className="nav-item"><NavLink to="/admin" className="nav-link px-3" onClick={handleNavLinkClick}>Адмін панель</NavLink></li>
              {/* <li className="nav-item"><NavLink to="/admin/requests" className="nav-link px-3" onClick={handleNavLinkClick}>Заявки</NavLink></li>
              <li className="nav-item"><NavLink to="/admin/records" className="nav-link px-3" onClick={handleNavLinkClick}>Медичні записи</NavLink></li> */}
            </>
          )}

          {role === 'DOCTOR' && (
            <>
              <li className="nav-item"><NavLink to="/doctor/profile" className="nav-link px-3" onClick={handleNavLinkClick}>Профіль</NavLink></li>
              <li className="nav-item"><NavLink to="/schedule" className="nav-link px-3" onClick={handleNavLinkClick}>Мій розклад</NavLink></li>
              <li className="nav-item"><NavLink to="/doctor/medical-records" className="nav-link px-3" onClick={handleNavLinkClick}>Медичні записи</NavLink></li>
            </>
          )}

          {role === 'PATIENT' && (
            <>
              <li className="nav-item"><NavLink to="/records" className="nav-link px-3" onClick={handleNavLinkClick}>Мої записи</NavLink></li>
              <li className="nav-item"><NavLink to="/my-appointments" className="nav-link px-3" onClick={handleNavLinkClick}>Мої прийоми</NavLink></li>
              <li className="nav-item"><NavLink to="/my-profile" className="nav-link px-3" onClick={handleNavLinkClick}>Мій профіль</NavLink></li>
            </>
          )}
        </ul>

        <ul className="navbar-nav ms-auto align-items-center">
          {isAuthenticated ? (
            <>
              <li className="nav-item me-3">
                <span className="navbar-text text-light fw-medium">
                  Привіт, <span className="text-info">{user?.username || 'Користувач'}</span>
                </span>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-info px-4 py-1" onClick={handleLogout}>
                  Вийти
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) => 'nav-link px-3' + (isActive ? ' active fw-semibold text-info' : '')}
                onClick={handleNavLinkClick}
              >
                Вхід
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
