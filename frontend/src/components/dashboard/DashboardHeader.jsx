import React from 'react';
import { Bell } from 'lucide-react';

const DashboardHeader = ({ title, subtitle, user }) => {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{title}</h1>
                <p className="text-gray-500">{subtitle}</p>
            </div>
            
            <div className="flex items-center gap-6">
                <button className="relative p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                    <Bell size={24} />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                
                <div className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200 shadow-sm">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-bold text-gray-900 leading-tight">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500 capitalize">{user?.role || 'Role'}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
