import React from 'react';
import '../css/base.css';
import '../css/app.css';
import '../css/index.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="container">
      <Navbar />

      <header>
        {/* HERO SECTION */}
        <section className="hero-section">
          <h1 className="hero-heading">Mindful learning for the modern world:
            <span className="highlight highlight-secondary">Quality education</span><br />
            for every student, everywhere 🎓
          </h1>

          <p className="hero-paragragh">
            EDOT (Education Digital Online Tutorials) is a modern learning platform
            that connects students with quality lessons, tutors, and digital resources.
          </p>

          <ul className="hero-btn-container">
            <li><a className="btn btn-primary" href="/register">Start learning</a></li>
            <li><a className="btn btn-primary-outline" href="#features">Explore features</a></li>
          </ul>
        </section>
      </header>

      <main>
        {/* FEATURE SECTION */}
        <section className="features-section" id="features">
          <h2 className="features-main-heading">
            A <span className="highlight highlight-tertiary">simple, effective</span> way to learn and grow
          </h2>

          <div className="features-grid-container">
            <div>
              <h3 className="feature-headings">Learn anytime, anywhere</h3>
              <p>
                Access educational content online from any location.
                Learn at your own pace with structured lessons and guidance.
              </p>
            </div>

            <img className="feature-img" src="/assets/images/features-1.jpg" alt="online learning" />
            <img className="feature-img" src="/assets/images/features-2.jpg" alt="digital education platform" />

            <div>
              <h3 className="feature-headings">Well-structured courses</h3>
              <p>
                Courses are organized by grade and subject, making learning
                simple, clear, and effective for students.
              </p>
            </div>

            <div>
              <h3 className="feature-headings">Online & in-person tutoring</h3>
              <p>
                EDOT combines digital learning with optional in-person tutoring
                to support students who need extra help.
              </p>
            </div>

            <img className="feature-img" src="/assets/images/features-3.jpg" alt="tutoring support" />
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="cta-section">
          <div className="cta-card">
            <h2 className="cta-heading">Join EDOT today</h2>
            <a className="btn btn-secondary" href="/register">Create free account</a>
          </div>
        </section>
      </main>

      <Footer />
      
      <div className="chat-container">
        <img className="chat-icon" src="/assets/images/edot-logos.png" alt="chat support" />
      </div>
    </div>
  );
};

export default LandingPage;
