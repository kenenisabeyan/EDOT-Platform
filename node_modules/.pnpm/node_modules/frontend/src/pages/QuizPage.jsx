import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import '../css/app.css';

const QuizPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <DashboardNavbar />
      <section className="dashboard">
        <Sidebar />
        <main className="dashboard-content" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Available Quizzes</h2>
          <p style={{ marginTop: '2rem' }}>No active layout for quizzes found. Coming soon!</p>
        </main>
      </section>
    </div>
  );
};

export default QuizPage;
