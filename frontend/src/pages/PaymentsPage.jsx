import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import '../css/app.css';

const PaymentsPage = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const handlePayment = () => {
    if (!method) {
      setStatus('Please select a payment method.');
      return;
    }
    setStatus(`Processing ${method} payment...`);
    setTimeout(() => {
      setStatus('Payment Successful! You are enrolled.');
    }, 1500);
  };

  return (
    <div>
      <DashboardNavbar />
      <section className="dashboard">
        <Sidebar />
        <main className="dashboard-content" style={{ padding: '2rem' }}>
          <div className="payment-container" style={{ background: '#111', padding: '2rem', borderRadius: '10px', maxWidth: '500px' }}>
            <h1>Enroll in Course</h1>
            <p className="course-name">Course: Web Development Basics</p>
            <p className="price" style={{ color: '#ff3366', fontSize: '1.2rem', margin: '1rem 0' }}>Price: 500 ETB</p>

            <div className="payment-methods" style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '1rem 0' }}>
              <h3>Select Payment Method</h3>
              <label>
                <input type="radio" name="payment" value="TeleBirr" onChange={(e) => setMethod(e.target.value)} />
                {' '}TeleBirr
              </label>
              <label>
                <input type="radio" name="payment" value="CBE Birr" onChange={(e) => setMethod(e.target.value)} />
                {' '}CBE Birr
              </label>
              <label>
                <input type="radio" name="payment" value="Bank Transfer" onChange={(e) => setMethod(e.target.value)} />
                {' '}Bank Transfer
              </label>
            </div>

            <button onClick={handlePayment} className="btn-primary" style={{ padding: '10px 20px', width: '100%' }}>Pay & Enroll</button>
            {status && <p id="status" style={{ marginTop: '1rem', textAlign: 'center' }}>{status}</p>}
          </div>
        </main>
      </section>
    </div>
  );
};

export default PaymentsPage;
