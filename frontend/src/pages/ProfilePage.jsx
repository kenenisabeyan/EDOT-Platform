import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import '../css/app.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Student Name');
  const [bio, setBio] = useState('I am an eager learner.');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSave = (e) => {
    e.preventDefault();
    alert('Profile saved!');
  };

  return (
    <div>
      <DashboardNavbar />
      <section className="dashboard">
        <Sidebar />
        <main className="dashboard-content" style={{ padding: '2rem' }}>
          <h2>Your Profile</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', background: '#111', padding: '2rem', borderRadius: '10px' }} onSubmit={handleSave}>
            <label>Name</label>
            <input 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Your Name" 
              style={{ padding: '10px', borderRadius: '5px' }}
            />
            <label>Bio</label>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              placeholder="Bio" 
              rows="4"
              style={{ padding: '10px', borderRadius: '5px' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '10px' }}>Save Profile</button>
          </form>
        </main>
      </section>
    </div>
  );
};

export default ProfilePage;
