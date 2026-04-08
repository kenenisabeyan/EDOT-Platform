import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import '../css/app.css';
import '../css/dashboard.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(['Review React JS', 'Complete Math Assignment']);
  const [newTask, setNewTask] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchUser();
  }, [navigate]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  return (
    <div>
      <DashboardNavbar />

      <section className="dashboard">
        <Sidebar />

        <main className="dashboard-content">
          <h1>Welcome back, {user ? user.fullName.split(' ')[0] : 'Student'} 👋</h1>
          <p className="subtitle">Here is your learning progress</p>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>📚 Courses</h3>
              <p>6 Enrolled</p>
            </div>
            <div className="stat-card">
              <h3>✅ Completed</h3>
              <p>3 Courses</p>
            </div>
            <div className="stat-card">
              <h3>⏳ In Progress</h3>
              <p>3 Courses</p>
            </div>
          </div>
          
          <div className="progress-section">
            <h2>Your Courses</h2>
            <div className="progress-card">
              <span>Mathematics</span>
              <div className="progress-bar">
                <div style={{ width: '70%', background: '#ff3366', height: '10px', borderRadius: '5px' }}></div>
              </div>
            </div>
            <div className="progress-card">
              <span>English</span>
              <div className="progress-bar">
                <div style={{ width: '90%', background: '#ff3366', height: '10px', borderRadius: '5px' }}></div>
              </div>
            </div>
            <div className="progress-card">
              <span>Programming</span>
              <div className="progress-bar">
                <div style={{ width: '45%', background: '#ff3366', height: '10px', borderRadius: '5px' }}></div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
            <section className="notifications" style={{ flex: 1, background: '#111', padding: '1rem', borderRadius: '10px' }}>
              <h3>Notifications</h3>
              <ul>
                <li>🚀 New course added: Advanced Node.js</li>
                <li>📝 Assignment due in 2 days</li>
              </ul>
            </section>

            <section className="planner" style={{ flex: 1, background: '#111', padding: '1rem', borderRadius: '10px' }}>
              <h3>Study Planner</h3>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input 
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add study task" 
                  style={{ padding: '8px', borderRadius: '5px', flex: 1 }}
                />
                <button onClick={addTask} className="btn-primary" style={{ padding: '8px 15px' }}>Add</button>
              </div>
              <ul style={{ listStyleType: 'circle', paddingLeft: '20px' }}>
                {tasks.map((task, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>{task}</li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </section>
    </div>
  );
};

export default DashboardPage;
