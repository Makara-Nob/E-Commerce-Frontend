import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ user }) {
  return (
    <nav>
      <div className="space-x-4">
        {user?.roles.includes("ROLE_ADMIN") && (
          <NavLink to="/dashboard">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-md">
              Admin Panel
            </button>
          </NavLink>
        )}
        <NavLink to="/profile">
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-md">
            Profile
          </button>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
