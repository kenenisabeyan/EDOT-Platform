import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar" id="sidebar">
      <Link className="active" to="/dashboard">📊 Dashboard</Link>
      <Link to="/courses">📚 My Courses</Link>
      <Link to="/assignments">📝 Assignments</Link>
      <Link to="/profile">👤 Profile</Link>
      <Link to="/settings">⚙ Settings</Link>
    </aside>
  );
};

export default Sidebar;
