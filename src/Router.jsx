import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'
import Shop from './pages/Shop' 
import ProductDetail from './pages/ProductDetail'
import ShopLayout from './Layout/ShopLayout'
import Login from './pages/Login'
import DashboardLayout from './Layout/DashboardLayout'
import Index from './pages/AdminDashboard/index'

const Router = () => {
  return (
        <Routes>
            <Route path='/' element={<ShopLayout />}>
                <Route index element={<Shop />} />
                <Route path='/product/:id' element={<ProductDetail />} />
            </Route>
            <Route path='/login' element={<Login />}/>
            <Route path='/dashboard' element={<DashboardLayout />}>
                <Route index element={<Index />} />
            </Route>
        </Routes>
  )
}

export default Router