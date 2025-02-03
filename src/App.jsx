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
import ProtectedRoute from './components/user/ProtectedRoute';
import CartContextProvider from './components/user/context/CartContext';
import Profile from './pages/user/profile/Profile';
import Info from './pages/user/profile/Info';
import Order from './pages/user/profile/Order';
import UserContextProvider from './components/user/context/UserContext';

export default function App() {

  const router = createBrowserRouter(
    [
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'register',
            element: <Register />
          },
          {
            path: 'login',
            element: <Login />
          }
        ]

      },
      {
        path: '/dashboard',
        element: <DashboardLayout />
      },
      {
        path: '/',
        element: <UserLayout />,
        children: [
          {
            path: '/',
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
            path: '/categories/:categoryID',
            element: <CategoryProducts />
          },
          {
            path: '/products/:productID',
            element: <Product />
          },
          {
            path: '/cart',
            element: <ProtectedRoute >
              <Cart />
            </ProtectedRoute>
          },
          {
            path: '/profile',
            element: <Profile />,
            children: [
              {
                path: 'info',
                element: <Info />
              },
              {
                path: 'order',
                element: <Order />
              }
            ]
          }
        ]
      }
    ]
  );
  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </CartContextProvider>
      </UserContextProvider>

    </>
  )
}
