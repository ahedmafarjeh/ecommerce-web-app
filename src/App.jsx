import React from 'react'
import CustomNavbar from './components/user/navbar/CustomNavbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Register from './pages/user/register/Register';
import Login from './pages/user/login/Login';
import { ToastContainer } from 'react-toastify';
import UserLayout from './layouts/UserLayout';
import Home from './pages/user/home/Home';
import Categories from './pages/user/category/Categories';
import Products from './pages/user/product/Products';
import CategoryProducts from './pages/user/category/CategoryProducts';
import Product from './pages/user/product/Product';
import Cart from './pages/user/cart/Cart';

export default function App() {

  const router = createBrowserRouter(
    [
      {
        path: '/auth',
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
      },
      {
        path:'/',
        element: <UserLayout />,
        children:[
          {
            path:'/',
            element: <Home />
          },
          {
            path: '/categories',
            element: <Categories />
          },
          {
            path: '/products',
            element: <Products />
          },
          {
            path:'/categories/:categoryID',
            element: <CategoryProducts />
          },
          {
            path: '/products/:productID',
            element: <Product />
          },
          {
            path: '/cart',
            element: <Cart />
          }
        ]
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
