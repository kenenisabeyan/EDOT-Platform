import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BookOpen, Star, CheckCircle, ArrowRight, PlayCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white -z-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Welcome to EDOT</span>
              <h1 className="text-5xl md:text-6xl font-poppins font-bold text-secondary mb-6 leading-tight">
                Learn without limits with <span className="text-primary">world-class</span> education
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Build your skills with online courses from top instructors. Advance your career, learn a new hobby, and achieve your goals with guided learning paths.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/courses" className="btn-primary flex items-center justify-center gap-2 text-lg">
                  Explore Courses <ArrowRight size={20} />
                </Link>
                <Link to="/register" className="btn-outline flex items-center justify-center gap-2 text-lg">
                  Join for Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-secondary mb-4">Top Categories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Discover the most popular subjects that students are learning today.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {['Computer Science', 'Mathematics', 'Business', 'Design'].map((category, idx) => (
                <div key={idx} className="card p-8 text-center group cursor-pointer border-t-4 border-t-transparent hover:border-t-primary">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category}</h3>
                  <p className="text-gray-500">100+ Courses</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-secondary mb-6">Why learn with EDOT?</h2>
                <p className="text-gray-600 mb-8 text-lg">
                  We provide a premium learning experience designed to help you succeed in your educational journey.
                </p>
                
                <div className="space-y-6">
                  {[
                    { title: 'Learn at your own pace', desc: 'Enjoy lifetime access to courses on our platform' },
                    { title: 'World-class instructors', desc: 'Learn from industry experts and passionate educators' },
                    { title: 'Interactive learning', desc: 'Quizzes, projects, and assignments to test your knowledge' }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="mt-1">
                        <CheckCircle className="text-accent" size={24} />
                      </div>
                      <div>
                        <h4 className="font-poppins font-semibold text-lg text-secondary">{feature.title}</h4>
                        <p className="text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="bg-gradient-to-br from-primary to-blue-400 rounded-3xl p-8 text-white relative z-10 shadow-xl overflow-hidden aspect-video flex items-center justify-center">
                    <PlayCircle size={80} className="opacity-90 hover:opacity-100 hover:scale-110 cursor-pointer transition-all duration-300" />
                </div>
                {/* Decorative background shape */}
                <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary rounded-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-secondary text-white text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-white mb-6">Ready to start your learning journey?</h2>
                <p className="text-gray-300 text-lg mb-10">Join thousands of students who are already advancing their careers and knowledge with EDOT.</p>
                <Link to="/register" className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-button font-semibold text-lg transition-all shadow-lg hover:shadow-blue-500/30">
                  Get Started for Free
                </Link>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
