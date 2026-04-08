import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, UserCheck, User, LogOut, Settings } from 'lucide-react';

const Sidebar = ({ role }) => {
    const location = useLocation();

    const getMenuItems = () => {
        let items = [
            { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }
        ];

        if (role === 'student') {
            items.push(
                { path: '/courses', label: 'My Courses', icon: BookOpen },
                { path: '/attendance', label: 'Attendance', icon: UserCheck }
            );
        } else if (role === 'instructor' || role === 'admin') {
            items.push(
                { path: '/courses', label: 'Manage Courses', icon: BookOpen },
                { path: '/manage-sections', label: 'Manage Sections', icon: Users },
                { path: '/attendance', label: 'Attendance', icon: UserCheck }
            );
        }

        if (role === 'admin') {
             items.push({ path: '/admin-analytics', label: 'Analytics', icon: Settings });
        }

        items.push({ path: '/profile', label: 'Profile', icon: User });
        
        return items;
    };

    return (
        <aside className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 sticky top-0 left-0 overflow-y-auto">
            <div className="p-6 border-b border-slate-800">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">E</div>
                    <span className="text-xl font-bold text-white tracking-wide">EDOT</span>
                </Link>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-2">
                {getMenuItems().map((item) => {
                    const active = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/dashboard');
                    return (
                        <Link 
                            key={item.path} 
                            to={item.path} 
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-900/20' : 'hover:bg-slate-800 hover:text-white'}`}
                        >
                            <item.icon size={20} className={active ? 'text-white' : 'text-slate-400'} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800 pb-8">
                <Link to="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors text-slate-400">
                    <LogOut size={20} />
                    <span>Logout</span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
