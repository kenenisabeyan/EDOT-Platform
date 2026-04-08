import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { BookOpen, User, CreditCard, HelpCircle, Bell, PenTool, LayoutDashboard, Settings, PlayCircle } from 'lucide-react';

const DashboardPage = () => {
    // In a real app we would load real data instead of mock.
    const [user] = useState({ name: 'Alex Johnson', role: 'student' });
    const enrolledCourses = [
        { id: 1, title: 'Complete React Developer in 2026', progress: 45, nextLesson: 'React context API' },
        { id: 2, title: 'Advanced Mathematics: Calculus', progress: 12, nextLesson: 'Limits and Continuity' }
    ];

    const completedLessons = 15;
    const upcomingTasks = 2;

    const SidebarItem = ({ icon: Icon, label, active, to }) => (
        <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-[8px] transition-colors ${active ? 'bg-primary text-white font-medium shadow-md' : 'text-gray-600 hover:bg-blue-50 hover:text-primary font-medium'}`}>
            <Icon size={20} />
            <span>{label}</span>
        </Link>
    );

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            
            <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-64 flex-shrink-0 hidden lg:block">
                    <div className="bg-white p-4 rounded-[12px] border border-border shadow-sm h-full max-h-[calc(100vh-120px)] sticky top-24">
                       <nav className="space-y-2">
                           <SidebarItem icon={LayoutDashboard} label="Overview" active={true} to="/dashboard" />
                           <SidebarItem icon={BookOpen} label="My Courses" to="/courses" />
                           <SidebarItem icon={Bell} label="Notifications" to="#" />
                           <div className="pt-4 mt-4 border-t border-border">
                             <p className="px-4 text-xs font-semibold uppercase text-gray-400 mb-2 mt-2">Study Tools</p>
                             <SidebarItem icon={PenTool} label="Quizzes" to="/quiz" />
                             <SidebarItem icon={User} label="Attendance" to="/attendance" />
                             <SidebarItem icon={Settings} label="Manage Sections" to="/manage-sections" />
                           </div>
                           <div className="pt-4 mt-4 border-t border-border">
                             <p className="px-4 text-xs font-semibold uppercase text-gray-400 mb-2 mt-2">Account</p>
                             <SidebarItem icon={User} label="Profile" to="/profile" />
                             <SidebarItem icon={CreditCard} label="Payments" to="/payments" />
                             <SidebarItem icon={Settings} label="Settings" to="#" />
                           </div>
                       </nav>
                    </div>
                </aside>

                {/* Dashboard Main Content */}
                <main className="flex-1">
                    <div className="mb-8">
                        <h1 className="text-3xl text-secondary mb-2">Welcome back, {user.name}! 👋</h1>
                        <p className="text-gray-600">Pick up right where you left off and continue your learning journey.</p>
                    </div>

                    {/* Stats Widget */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-[12px] border border-border shadow-sm flex items-center gap-4">
                           <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                               <BookOpen className="text-primary" size={24} />
                           </div>
                           <div>
                               <div className="text-2xl font-bold text-secondary">{enrolledCourses.length}</div>
                               <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Enrolled Courses</div>
                           </div>
                        </div>
                        <div className="bg-white p-6 rounded-[12px] border border-border shadow-sm flex items-center gap-4">
                           <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                               <PlayCircle className="text-accent" size={24} />
                           </div>
                           <div>
                               <div className="text-2xl font-bold text-secondary">{completedLessons}</div>
                               <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Completed Lessons</div>
                           </div>
                        </div>
                        <div className="bg-white p-6 rounded-[12px] border border-border shadow-sm flex items-center gap-4">
                           <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                               <Bell className="text-amber-500" size={24} />
                           </div>
                           <div>
                               <div className="text-2xl font-bold text-secondary">{upcomingTasks}</div>
                               <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Upcoming Lessons</div>
                           </div>
                        </div>
                    </div>

                    {/* In Progress Courses */}
                    <h2 className="text-2xl text-secondary mb-6">In Progress</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {enrolledCourses.map(course => (
                            <div key={course.id} className="card p-6 flex flex-col justify-between">
                               <div>
                                   <h3 className="font-semibold text-lg text-secondary mb-4 line-clamp-1">{course.title}</h3>
                                   <div className="mb-2 flex justify-between text-sm">
                                       <span className="text-gray-500">Overall Progress</span>
                                       <span className="font-medium text-primary">{course.progress}%</span>
                                   </div>
                                   <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                   </div>
                                   <div className="text-sm text-gray-600 mb-6 bg-gray-50 p-3 rounded-[8px] border border-border">
                                       <span className="font-medium text-secondary">Up next:</span> {course.nextLesson}
                                   </div>
                               </div>
                               <Link to={`/lessons/${course.id}`} className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-2">
                                  <PlayCircle size={18} /> Continue Learning
                               </Link>
                            </div>
                        ))}
                    </div>

                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
