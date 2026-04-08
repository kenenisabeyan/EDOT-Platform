import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import '../css/app.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFullName(res.data.fullName || '');
        setBio(res.data.bio || '');
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        console.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage('Saving...');
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/users/me', { fullName, bio }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profile saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving profile');
    }
  };

  return (
    <div>
      <DashboardNavbar />
      <section className="dashboard">
        <Sidebar />
        <main className="dashboard-content" style={{ padding: '2rem' }}>
          <h2>Your Profile</h2>
          {loading ? <p>Loading profile...</p> : (
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', background: '#111', padding: '2rem', borderRadius: '10px' }} onSubmit={handleSave}>
              <label>Full Name</label>
              <input 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                placeholder="Your Name" 
                style={{ padding: '10px', borderRadius: '5px' }}
                required
              />
              <label>Bio</label>
              <textarea 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                placeholder="Tell us about yourself" 
                rows="4"
                style={{ padding: '10px', borderRadius: '5px' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '10px' }}>Save Profile</button>
              {message && <p style={{ marginTop: '1rem', textAlign: 'center', color: message.includes('Error') ? '#ff3366' : '#4caf50' }}>{message}</p>}
            </form>
          )}
        </main>
      </section>
    </div>
  );
};

export default ProfilePage;
