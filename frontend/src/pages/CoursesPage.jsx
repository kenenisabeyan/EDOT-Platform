import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Search, Filter, Clock, User, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardBody } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses?search=${search}&category=${category}`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    
    // Quick debounce simulation for search
    const delayDebounceFn = setTimeout(() => {
      fetchCourses();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, category]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-8 w-full">
        <PageHeader 
            title="Explore Courses" 
            subtitle="Find the perfect course to advance your career or learn something completely new." 
        />

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="w-full md:w-1/2">
            <Input
              icon={<Search size={20} />}
              placeholder="Search for courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <Select
              icon={<Filter size={20} />}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { label: 'All Categories', value: '' },
                { label: 'Programming', value: 'Programming' },
                { label: 'Math', value: 'Math' },
                { label: 'Science', value: 'Science' },
                { label: 'Exam Prep', value: 'Exam Prep' },
              ]}
            />
          </div>
        </div>

        {/* Course Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
             <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
             <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
             <p className="mt-1">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="group flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {course.category || 'General'}
                  </div>
                </div>
                
                <CardBody className="flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                  
                  <div className="flex items-center gap-2 text-gray-500 mb-4 text-sm">
                    <User size={16} />
                    <span>{course.instructor_name}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-sm font-medium text-blue-600">
                      <Users size={16} fill="currentColor" />
                      <span>{course.enrolled_students || 0} students</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <Link to={`/courses/${course.id}`} className="mt-6 w-full text-center text-sm py-2 px-4 rounded-lg border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                    View Course Details
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CoursesPage;
