import React from 'react'
import CustomNavbar from '../components/user/navbar/CustomNavbar'
import { Outlet } from 'react-router-dom'
import AuthNavbar from '../components/user/navbar/AuthNavbar'
import Footer from '../components/Footer/Footer'

export default function AuthLayout() {
  return (
    <>

    
    <AuthNavbar />
      {/* outlet: بتحط childe الي نادى على هذه layout مثلا register or login */}
      <Outlet /> 

      <Footer />
  
    </>
  )
}
