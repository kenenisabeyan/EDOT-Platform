import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/base.css';
import '../css/register.css';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { 
        fullName, 
        email, 
        password 
      });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-card">
      <Link to="/">
        <img src="/assets/images/edot-logos.png" className="auth-logo" alt="EDOT logo" />
      </Link>
      <h2 className="auth-heading">Create Account</h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form className="auth-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required 
          />
        </div>

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

        <button type="submit" className="auth-btn">Register</button>
      </form>

      <p className="auth-text">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
