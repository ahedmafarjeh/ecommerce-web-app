import React from 'react'
import CustomNavbar from './components/user/navbar/CustomNavbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Register from './pages/user/register/Register';
import Login from './pages/user/login/Login';
import { ToastContainer } from 'react-toastify';

export default function App() {

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <AuthLayout />,
        children:[
          {
            path:'register',
            element: <Register />
          },
          {
            path:'login',
            element: <Login />
          }
        ]
        
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />
      }
    ]
  );
  return (
    <>
      <ToastContainer />
    <RouterProvider router={router} />
    </>
  )
}
