import React, { useState } from 'react';
import { BookOpen, Users, PlayCircle, Clock } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatCard from '../components/dashboard/StatCard';
import CourseCard from '../components/dashboard/CourseCard';
import Card, { CardBody } from '../components/ui/Card';

const DashboardPage = () => {
    // In a real app we load user role and data dynamically.
    const [user] = useState({ name: 'Alex Johnson', role: 'student' });
    
    // Mock Data
    const enrolledCourses = [
        { id: 1, title: 'Complete React Developer in 2026', progress: 45, duration: '40h 20m', students: 12500, category: 'Programming' },
        { id: 2, title: 'Advanced Mathematics: Calculus', progress: 12, duration: '15h 10m', students: 840, category: 'Math' }
    ];

    const isStudent = user.role === 'student';

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden font-inter">
            {/* 1. Sidebar (Fixed) */}
            <Sidebar role={user.role} />

            {/* 2. Main Content (Scrollable) */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8 max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <DashboardHeader 
                        title="Dashboard" 
                        subtitle={`Welcome back, ${user.name}! Pick up right where you left off.`}
                        user={user}
                    />

                    {/* STATS CARDS (TOP ROW) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard 
                            title={isStudent ? "Enrolled Courses" : "Managed Courses"}
                            value={enrolledCourses.length}
                            icon={BookOpen}
                            bgColorClass="bg-blue-100"
                            colorClass="text-blue-700"
                        />
                        <StatCard 
                            title={isStudent ? "Completed Lessons" : "Total Students"}
                            value={isStudent ? 15 : 245}
                            icon={PlayCircle}
                            bgColorClass="bg-emerald-100"
                            colorClass="text-emerald-700"
                        />
                        <StatCard 
                            title="Attendance Rate"
                            value="94%"
                            icon={Users}
                            bgColorClass="bg-purple-100"
                            colorClass="text-purple-700"
                        />
                        <StatCard 
                            title="Hours Spent"
                            value="28h"
                            icon={Clock}
                            bgColorClass="bg-amber-100"
                            colorClass="text-amber-700"
                        />
                    </div>

                    {/* MAIN CONTENT GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* LEFT WIDE SECTION (2/3) */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">{isStudent ? 'My Courses' : 'Managed Courses'}</h2>
                                <a href="/courses" className="text-sm font-medium text-blue-600 hover:text-blue-800">View all</a>
                            </div>

                            {enrolledCourses.length === 0 ? (
                                <Card className="py-16 text-center shadow-none border-dashed border-2">
                                    <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                    <h3 className="text-lg font-bold text-gray-900">No courses yet</h3>
                                    <p className="text-gray-500 mt-1">Visit the course catalog to start learning.</p>
                                </Card>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {enrolledCourses.map(course => (
                                        <CourseCard 
                                            key={course.id} 
                                            course={course} 
                                            role={user.role}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* RIGHT NARROW SECTION (1/3) */}
                        <div className="lg:col-span-1 space-y-8">
                            
                            {/* Upcoming Sessions / Notifications */}
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Sessions</h2>
                                <Card hover={false} className="border-gray-100">
                                    <CardBody className="p-0">
                                        <div className="divide-y divide-gray-100">
                                            <div className="p-5 hover:bg-gray-50 transition-colors">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-bold text-gray-900">React Context API</h4>
                                                    <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded w-max">Tomorrow</span>
                                                </div>
                                                <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-2">
                                                    <Clock size={14} /> 10:00 AM - 11:30 AM
                                                </p>
                                            </div>
                                            <div className="p-5 hover:bg-gray-50 transition-colors">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-bold text-gray-900">Calculus Finals Prep</h4>
                                                    <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded w-max">2 Days</span>
                                                </div>
                                                <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-2">
                                                    <Clock size={14} /> 02:00 PM - 04:00 PM
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                                            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">View Full Schedule</a>
                                        </div>
                                    </CardBody>
                                </Card>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                                <Card hover={false} className="border-gray-100">
                                    <CardBody>
                                        <div className="space-y-6">
                                            <div className="flex gap-4">
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0 relative z-10 ring-4 ring-emerald-50"></div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">Completed Quiz: React Basics</p>
                                                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0 relative z-10 ring-4 ring-blue-50"></div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">Enrolled in Advanced Calculus</p>
                                                    <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-2.5 h-2.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0 relative z-10 ring-4 ring-purple-50"></div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">Successfully marked present</p>
                                                    <p className="text-xs text-gray-500 mt-1">Mar 28, 2026</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </section>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
