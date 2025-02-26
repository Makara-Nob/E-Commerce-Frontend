import React from 'react'
import Navbar from './navbar'
import { useAuth } from '../hooks/useAuth';
import Authentication from './Authentication';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex rounded-2xl justify-between items-center mb-5 px-5 py-3 bg-white shadow-md">
        <div className="text-xl font-bold">
            <Link to="/">MyApp</Link>
        </div>
        <div className="flex items-center gap-4"> {/* Ensures proper spacing */}
            <Authentication user={user} logout={logout} />
            <Navbar user={user} />
        </div>
    </header>

  )
}

export default Header