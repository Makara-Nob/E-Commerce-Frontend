import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleStatusTab } from '../store/cartSlice';
import { ShoppingBagIcon } from '@heroicons/react/16/solid';
function Navbar({ user, logout }) {
  const dispatch = useDispatch()

  return (
    <nav className="flex px-6 py-4 bg-white rounded-2xl">
      <div className="flex items-center space-x-4">
        {/* Admin Panel Button */}
        {user?.roles?.includes("ROLE_ADMIN") && (
          <NavLink to="/dashboard">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-2 py-2 rounded-lg transition-all duration-300 shadow-md">
              Admin Panel
            </button>
          </NavLink>
        )}

        {/* Authentication (Login / Logout) */}
        {user ? (
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-sm px-3 py-2 rounded-lg transition-all duration-300 shadow-md"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login">
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-md">
              Login
            </button>
          </NavLink>
        )}

        {/* Shopping Cart */}
        {user && (
          <div
            className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative cursor-pointer hover:bg-gray-200 transition"
            onClick={() => dispatch(toggleStatusTab())}
          >
            <ShoppingBagIcon className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex justify-center items-center">
                0
              </span>
          </div>
        )}

        {/* Profile Button */}
        {user && (
          <div className="flex flex-col items-center">
            <NavLink to="/profile">
              <img
                src={"https://www.dummyimage.co.uk/50x50/cbcbcb"} // Default avatar
                alt="User Profile"
                className="w-10 h-10 rounded-full border border-gray-300 shadow-md"
              />
            </NavLink>
            <p className="text-sm font-semibold text-gray-700 mt-1">{user.name}</p>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
