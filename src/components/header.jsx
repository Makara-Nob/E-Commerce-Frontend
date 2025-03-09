import React from 'react'
import Navbar from './navbar'
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch()
  const { user, logout }= useAuth()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="flex rounded-2xl justify-between items-center mb-5 px-2 bg-white shadow-md">
        <div className="text-xl font-bold">
            <Link to="/">MyApp</Link>
        </div>
        <div className="flex items-center gap-4"> 
            <Navbar user={user} logout={handleLogout}/>
        </div>
    </header>
  )
}

export default Header