import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/app.css';
import '../css/courses.css';

const CoursesPage = () => {
  return (
    <div className="container">
      <Navbar />

      <main>
        <section className="edot-courses" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2>Our Courses</h2>
          <p>Explore structured courses designed for student success.</p>
        
          <div className="course-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div className="course-card math" style={{ background: '#111', padding: '2rem', borderRadius: '10px' }}>
              <div className="icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>📘</div>
              <h3>Mathematics</h3>
              <p>Build strong problem-solving skills.</p>
              <button className="btn-primary" style={{ marginTop: '1rem' }}>View Course</button>
            </div>
        
            <div className="course-card english" style={{ background: '#111', padding: '2rem', borderRadius: '10px' }}>
              <div className="icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
              <h3>English</h3>
              <p>Improve reading, writing, and communication.</p>
              <button className="btn-primary" style={{ marginTop: '1rem' }}>View Course</button>
            </div>
        
            <div className="course-card programming" style={{ background: '#111', padding: '2rem', borderRadius: '10px' }}>
              <div className="icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>💻</div>
              <h3>Programming</h3>
              <p>Learn coding from basics to advanced.</p>
              <button className="btn-primary" style={{ marginTop: '1rem' }}>View Course</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CoursesPage;
