import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/app.css';
import '../css/contact.css';

const ContactPage = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending message...');
    setTimeout(() => {
      setStatus('Message sent successfully!');
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="container">
      <Navbar />

      <section className="contact-section" style={{ padding: '4rem 2rem' }}>
        <div className="contact-container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          
          <div className="contact-info" style={{ flex: '1', minWidth: '300px', background: '#111', padding: '2rem', borderRadius: '10px' }}>
            <h2>Contact EDOT</h2>
            <p className="par" style={{ marginBottom: '1.5rem' }}>
              Have any questions or ideas?
              The EDOT team is ready to support your learning journey.
            </p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>📍 Location:</strong> Ethiopia</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>📧 Email:</strong> edotplatform@gmail.com</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>📞 Phone:</strong> +251 9XX XXX XXX</li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} style={{ flex: '1', minWidth: '300px', background: '#111', padding: '2rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>Send a Message</h3>
            <input type="text" placeholder="Your Name" required style={{ padding: '10px', borderRadius: '5px' }} />
            <input type="email" placeholder="Your Email" required style={{ padding: '10px', borderRadius: '5px' }} />
            <textarea placeholder="Your Message" rows="5" required style={{ padding: '10px', borderRadius: '5px' }}></textarea>
            <button type="submit" className="btn-primary" style={{ padding: '10px' }}>Send Message</button>
            {status && <p className="form-status" style={{ textAlign: 'center', color: '#ff3366' }}>{status}</p>}
          </form>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
