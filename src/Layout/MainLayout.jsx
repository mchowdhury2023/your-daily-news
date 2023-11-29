import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Pages/Home/Navbar/Navbar'
import Footer from '../Pages/Home/Footer/Footer'

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    const siteName = 'DailyNews';
    const pageTitle = location.pathname === '|' 
                      ? siteName 
                      : `${siteName} | ${location.pathname.substring(1)}`;
    document.title = pageTitle;
}, [location]);
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