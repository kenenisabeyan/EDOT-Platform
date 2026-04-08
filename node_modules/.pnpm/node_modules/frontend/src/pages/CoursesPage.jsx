import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Search, Filter, Star, Clock, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="mb-10">
          <h1 className="text-secondary mb-4">Explore Courses</h1>
          <p className="text-gray-600 text-lg max-w-3xl">Find the perfect course to advance your career or learn something completely new.</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-[12px] shadow-sm border border-border mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for courses..."
              className="pl-10 w-full border border-border rounded-[8px] py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="text-gray-400" size={20} />
              </div>
              <select 
                className="pl-10 w-full border border-border rounded-[8px] py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Programming">Programming</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="Exam Prep">Exam Prep</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="card group flex flex-col h-full cursor-pointer hover:-translate-y-1 transition-transform duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {course.category || 'General'}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold text-secondary mb-2 line-clamp-2">{course.title}</h3>
                
                <div className="flex items-center gap-2 text-gray-600 mb-4 text-sm">
                  <User size={16} className="text-gray-400" />
                  <span>{course.instructor_name}</span>
                </div>
                
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
                    <Users size={16} fill="currentColor" />
                    <span>{course.enrolled_students || 0} students</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <Link to={`/courses/${course.id}`} className="mt-6 w-full btn-outline text-center text-sm py-2">
                  View Course Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoursesPage;
