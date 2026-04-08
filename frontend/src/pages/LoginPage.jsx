import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/base.css';
import '../css/login.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/dashboard'); // Navigate to dashboard later
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-card">
      <Link to="/">
        <img src="/assets/images/edot-logos.png" className="auth-logo" alt="EDOT logo" />
      </Link>
      <h2 className="auth-heading">Login to EDOT</h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form className="auth-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <button type="submit" className="auth-btn">Login</button>
      </form>

      <p className="auth-text">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
