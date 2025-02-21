import React from 'react'
import CustomNavbar from '../components/user/navbar/CustomNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

export default function UserLayout() {
  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
        <div className='flex-grow-1'>
        <CustomNavbar />
        <Outlet />
        </div>
        <Footer />
      </div>

    </>
  )
}
