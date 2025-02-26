import React from 'react';
import { Link } from 'react-router-dom';

const Authentication = ({ user, logout }) => {
  return (
    <div className="flex items-end space-x-4">
      {user ? (
        <div className="flex items-center space-x-3">
          <span className="text-white font-medium">Welcome, {user.name}</span>
          <button 
            onClick={logout} 
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-md"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-md">
              Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default Authentication;
