import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src="/assets/images/edot-logos.png" alt="EDOT Logo" className="footer-logo" />

        <p>© 2026 EDOT Platform. All rights reserved.</p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/courses">Courses</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
