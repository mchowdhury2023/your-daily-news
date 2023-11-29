import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Pages/Home/Navbar/Navbar'
import Footer from '../Pages/Home/Footer/Footer'

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <main style={{ flex: 1, marginTop:'24px', marginBottom: '50px' }}>
      <Outlet />
    </main>
    <Footer />
  </div>
  )
}

export default MainLayout