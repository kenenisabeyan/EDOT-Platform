import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/app.css';
import '../css/about.css';

const AboutPage = () => {
  return (
    <div className="container">
      <Navbar />

      <section className="about-section" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2>Who We Are</h2>
        <p className="about-text" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          EDOT Platform is a digital education system designed to help primary and secondary school students learn anytime,
          anywhere using modern technology and quality content.
        </p>

        <div className="dashboard" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div className="card" style={{ background: '#111', padding: '2rem', borderRadius: '10px' }}>
            <h3>🎓 Quality Learning</h3>
            <p>Structured lessons prepared by skilled instructors.</p>
          </div>

          <div className="card" style={{ background: '#111', padding: '2rem', borderRadius: '10px' }}>
            <h3>🌍 Accessible Anywhere</h3>
            <p>Learn online or offline using mobile or desktop devices.</p>
          </div>

          <div className="card" style={{ background: '#111', padding: '2rem', borderRadius: '10px' }}>
            <h3>💡 Modern Skills</h3>
            <p>Technology-based education for future readiness.</p>
          </div>

          <div className="card" style={{ background: '#111', padding: '2rem', borderRadius: '10px' }}>
            <h3>🤝 Student Support</h3>
            <p>Guidance, tutoring, and continuous academic support.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
