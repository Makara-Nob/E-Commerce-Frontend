import React from 'react'
import Header from '../components/header'
import { Outlet } from 'react-router-dom'
import Cart from '../pages/Cart'
import { useSelector } from 'react-redux'
import HeroSection from '../components/HeroSection'
const ShopLayout = () => {
  const { statusTab } = useSelector((state) => state.cart)

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  }; 

  return (
    <div>
        <Header/>
        <main>
            <Outlet />
        </main>
        {statusTab && <Cart />}
    </div>
  )
}

export default ShopLayout