import React from 'react'
import CustomNavbar from '../components/user/navbar/CustomNavbar'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <>
      <CustomNavbar />
      {/* outlet: بتحط childre الي نادى على هذه layout مثلا register or login */}
      <Outlet /> 
    </>
  )
}
