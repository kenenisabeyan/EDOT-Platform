import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/app.css';
import '../css/courses.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses');
        setCourses(res.data);
      } catch (error) {
        console.error('Failed to load courses', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="container">
      <Navbar />

      <main>
        <section className="edot-courses" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2>Our Courses</h2>
          <p>Explore structured courses designed for student success.</p>
        
          {loading ? (
            <p style={{ marginTop: '2rem' }}>Loading courses...</p>
          ) : (
            <div className="course-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              {courses.map(course => (
                <div key={course.id} className="course-card" style={{ background: '#111', padding: '2rem', borderRadius: '10px' }}>
                  <div className="icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{course.icon}</div>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <button className="btn-primary" style={{ marginTop: '1rem' }}>View Course</button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CoursesPage;
