import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <nav className="navbar dashboard-nav">
      <h2 className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        EDOT
      </h2>
      <div style={{ display: 'flex', gap: '15px' }}>
        <button id="darkToggle" className="btn-outline" onClick={toggleDarkMode}>🌙</button>
        <button id="logoutBtn" className="btn-primary" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
