import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Clock, PlayCircle, Star, User, BookOpen, CheckCircle } from 'lucide-react';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Mock data for Course Detail
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // In real app, fetch from /api/courses/{id}
    const mockCourse = {
      id: parseInt(id),
      title: 'Complete React Developer in 2026',
      instructor_name: 'Andrei Neagoie',
      instructor_bio: 'Senior Software Developer and Instructor with 10+ years of experience.',
      category: 'Programming',
      duration: '40h 20m',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      rating: 4.8,
      students: 12500,
      description: 'Become a Senior React Developer! Build a massive E-commerce app with Redux, Hooks, GraphQL, ContextAPI, Stripe, Firebase.',
      lessons: [
        { id: 1, title: 'Introduction to React', duration: '15:20' },
        { id: 2, title: 'Setting up the Environment', duration: '10:45' },
        { id: 3, title: 'React Hooks Deep Dive', duration: '45:00' },
        { id: 4, title: 'State Management with Redux', duration: '55:30' }
      ]
    };
    setCourse(mockCourse);
  }, [id]);

  const handleEnroll = () => {
    // Simulate enroll API call
    alert('Successfully enrolled!');
    navigate(`/lessons/${id}`);
  };

  if (!course) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header section with background */}
      <div className="bg-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-2/3">
              <span className="bg-primary/20 text-blue-300 border border-blue-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 inline-block">
                {course.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-white">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-8">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400" fill="currentColor" size={20} />
                  <span className="font-medium text-white">{course.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={20} />
                  <span>{course.students.toLocaleString()} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>

            {/* Sticky Enrollment Card */}
            <div className="lg:w-1/3 w-full">
              <div className="bg-white rounded-[12px] p-2 shadow-xl border border-border mt-0 lg:-mt-24 sticky top-24">
                <div className="relative h-48 md:h-64 rounded-[8px] overflow-hidden mb-6">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <PlayCircle size={64} className="text-white opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="text-3xl font-bold text-secondary mb-6">$49.99</div>
                  <button onClick={handleEnroll} className="btn-primary w-full py-4 text-lg mb-4">Enroll Now</button>
                  <p className="text-center text-sm text-gray-500 mb-6">30-Day Money-Back Guarantee</p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-secondary">This course includes:</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <PlayCircle size={16} /> {course.duration} on-demand video
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <BookOpen size={16} /> 15 downloadable resources
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle size={16} /> Certificate of completion
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Instructor Section */}
          <section className="bg-white p-8 rounded-[12px] border border-border shadow-sm">
            <h2 className="text-2xl mb-6 text-secondary">Instructor</h2>
            <div className="flex gap-6 items-start">
              <div className="bg-blue-100 rounded-full h-20 w-20 flex items-center justify-center flex-shrink-0 text-primary font-bold text-2xl">
                {course.instructor_name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{course.instructor_name}</h3>
                <p className="text-gray-600 mb-4">{course.instructor_bio}</p>
                <div className="flex gap-4 text-sm text-primary font-medium">
                  <span className="flex items-center gap-1"><Star size={16} /> 4.8 Instructor Rating</span>
                  <span className="flex items-center gap-1"><User size={16} /> 45,000 Students</span>
                </div>
              </div>
            </div>
          </section>

          {/* Curriculum Section */}
          <section>
            <h2 className="text-2xl mb-6 text-secondary">Course Curriculum</h2>
            <div className="bg-white rounded-[12px] border border-border shadow-sm overflow-hidden">
              {course.lessons.map((lesson, idx) => (
                <div key={lesson.id} className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${idx !== course.lessons.length - 1 ? 'border-b border-border' : ''}`}>
                  <div className="flex items-center gap-4">
                    <PlayCircle className="text-primary" size={20} />
                    <span className="font-medium text-gray-800">{lesson.title}</span>
                  </div>
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock size={14} /> {lesson.duration}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CourseDetailPage;
