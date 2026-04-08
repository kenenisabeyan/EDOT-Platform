import React from 'react';
import './../css/base.css';
import './../css/app.css';

const Navbar = () => {
  return (
    <header className="site-header">
      <nav className="navbar">
        <a href="/" className="logo">
          <img src="/assets/images/edot-logos.png" alt="EDOT Logo" />
          <span>EDOT</span>
        </a>
    
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/courses">Courses</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
    
        <div className="nav-actions">
          <a href="/login" className="btn-outline">Login</a>
          <a href="/register" className="btn-primary">Register</a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
