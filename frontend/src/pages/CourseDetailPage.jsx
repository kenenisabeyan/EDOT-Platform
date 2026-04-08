import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Clock, PlayCircle, Star, User, BookOpen, CheckCircle, ArrowLeft } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';

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

      {/* Main Content Area replacing messy top header */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-8 w-full gap-8 grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <Link to="/courses" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline mb-4">
              <ArrowLeft size={16} /> Back to Courses
          </Link>
          
          <div>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                {course.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-gray-900">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-8">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <Star className="text-amber-500" fill="currentColor" size={20} />
                  <span className="font-medium text-gray-900">{course.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={20} className="text-gray-400" />
                  <span>{course.students.toLocaleString()} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-gray-400" />
                  <span>{course.duration}</span>
                </div>
              </div>
          </div>

          {/* Instructor Section */}
          <section className="mb-10">
            <h2 className="text-2xl mb-6 font-bold text-gray-900">Instructor</h2>
            <Card hover={false}>
              <CardBody className="flex gap-6 items-start">
                  <div className="bg-blue-100 rounded-full h-20 w-20 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-2xl">
                    {course.instructor_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{course.instructor_name}</h3>
                    <p className="text-gray-600 mb-4">{course.instructor_bio}</p>
                    <div className="flex gap-4 text-sm text-blue-600 font-medium">
                      <span className="flex items-center gap-1"><Star size={16} /> 4.8 Instructor Rating</span>
                      <span className="flex items-center gap-1"><User size={16} /> 45,000 Students</span>
                    </div>
                  </div>
              </CardBody>
            </Card>
          </section>

          {/* Curriculum Section */}
          <section className="mb-10">
            <h2 className="text-2xl mb-6 font-bold text-gray-900">Course Curriculum</h2>
            <Card hover={false}>
              <div className="flex flex-col">
                  {course.lessons.map((lesson, idx) => (
                    <div key={lesson.id} className={`p-5 flex items-center justify-between hover:bg-gray-50 transition-colors ${idx !== course.lessons.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div className="flex items-center gap-4">
                        <PlayCircle className="text-gray-400" size={20} />
                        <span className="font-medium text-gray-700">{lesson.title}</span>
                      </div>
                      <span className="text-sm text-gray-500 flex items-center gap-2">
                        <Clock size={14} /> {lesson.duration}
                      </span>
                    </div>
                  ))}
              </div>
            </Card>
          </section>
        </div>

        {/* Sticky Enrollment Card Sidebar */}
        <div className="lg:col-span-1 w-full">
            <Card hover={false} className="sticky top-24 shadow-md border-gray-200">
                <div className="relative h-56 w-full overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <PlayCircle size={64} className="text-white opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
                  </div>
                </div>
                <CardBody>
                  <div className="text-3xl font-bold text-gray-900 mb-6">$49.99</div>
                  <Button onClick={handleEnroll} variant="primary" className="w-full py-3 mb-4 text-lg font-bold">
                    Enroll Now
                  </Button>
                  <p className="text-center text-sm text-gray-500 mb-6">30-Day Money-Back Guarantee</p>
                  
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h4 className="font-bold text-gray-900">This course includes:</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <PlayCircle size={18} className="text-gray-400" /> {course.duration} on-demand video
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <BookOpen size={18} className="text-gray-400" /> 15 downloadable resources
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle size={18} className="text-gray-400" /> Certificate of completion
                    </div>
                  </div>
                </CardBody>
            </Card>
        </div>
      </main>
    </div>
  );
};

export default CourseDetailPage;
