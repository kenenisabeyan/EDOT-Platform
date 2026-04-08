import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Basic mock auth state - in a real app this would come from a global store/context
  const token = localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary text-white p-2 rounded-lg">
                <BookOpen size={24} />
              </div>
              <span className="font-poppins font-bold text-2xl text-secondary">EDOT</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-800 hover:text-primary font-medium transition-colors">Home</Link>
            <Link to="/courses" className="text-gray-800 hover:text-primary font-medium transition-colors">Courses</Link>
            {token && <Link to="/dashboard" className="text-gray-800 hover:text-primary font-medium transition-colors">Dashboard</Link>}
            <Link to="/about" className="text-gray-800 hover:text-primary font-medium transition-colors">About</Link>
            <Link to="/contact" className="text-gray-800 hover:text-primary font-medium transition-colors">Contact</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="text-text hover:text-primary flex items-center gap-2 font-medium">
                  <User size={20} />
                  Profile
                </Link>
                <button onClick={handleLogout} className="btn-outline">Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-primary font-medium hover:text-blue-700 transition-colors">Log in</Link>
                <Link to="/register" className="btn-primary">Sign up</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text hover:text-primary p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 space-y-4 shadow-lg absolute w-full">
          <Link to="/" className="block text-text hover:text-primary font-medium py-2">Home</Link>
          <Link to="/courses" className="block text-text hover:text-primary font-medium py-2">Courses</Link>
          {token && <Link to="/dashboard" className="block text-text hover:text-primary font-medium py-2">Dashboard</Link>}
          <Link to="/about" className="block text-text hover:text-primary font-medium py-2">About</Link>
          <Link to="/contact" className="block text-text hover:text-primary font-medium py-2">Contact</Link>
          
          <div className="pt-4 border-t border-border flex flex-col gap-3">
            {token ? (
              <>
                <Link to="/profile" className="block text-text hover:text-primary font-medium py-2">Profile</Link>
                <button onClick={handleLogout} className="btn-outline w-full text-center">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-primary font-medium py-2 text-center border border-primary rounded-[8px]">Log in</Link>
                <Link to="/register" className="btn-primary block text-center w-full">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
