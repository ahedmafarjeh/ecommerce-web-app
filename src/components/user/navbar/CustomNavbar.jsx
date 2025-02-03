import React, { useContext, useState } from 'react'
import { Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import style from './navbarStyle.module.css'
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

export default function CustomNavbar() {
  const { cartCount } = useContext(CartContext);
  const {user} = useContext(UserContext);
  const [hoveredLink, setHoveredLink] = useState(null);
  // Function to handle mouse enter and leave for each link
  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };
  const handleMouseLeave = () => {
    setHoveredLink(null);
  };
  return (
    <Navbar expand="lg" sticky='top' className={style.darknav}>
      <Container>
        <Navbar.Brand className='text-light' href="#home">Ahed-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            {localStorage.getItem('userToken')?
              ""
            :  
            <>
            <Nav.Link as={NavLink} to={'/auth/login'}
          style={({ isActive }) => ({
            fontWeight: isActive ? 'bold' : 'normal',
            color: isActive ? 'red' : hoveredLink === 'Login' ? "red" : "white",
            borderRadius: "5px",
            backgroundColor: isActive ? "transparent" : hoveredLink === 'Login' ? 'white' : 'transparent',
          })}
          onMouseEnter={() => handleMouseEnter('Login')}
          onMouseLeave={handleMouseLeave}>Login</Nav.Link>
        <Nav.Link as={NavLink} to={'/auth/register'}
          style={({ isActive }) => ({
            fontWeight: isActive ? 'bold' : 'normal',
            color: isActive ? 'red' : hoveredLink === 'Register' ? "red" : "white",
            borderRadius: "5px",
            backgroundColor: isActive ? "transparent" : hoveredLink === 'Register' ? 'white' : 'transparent',
          })}
          onMouseEnter={() => handleMouseEnter('Register')}
          onMouseLeave={handleMouseLeave}>Register</Nav.Link>
          
          </>
          }
            <Nav.Link as={NavLink} to={'/categories'}
              style={({ isActive }) => ({
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? 'red' : hoveredLink === 'Categories' ? "red" : "white",
                borderRadius: "5px",
                backgroundColor: isActive ? "transparent" : hoveredLink === 'Categories' ? 'white' : 'transparent',
              })}
              onMouseEnter={() => handleMouseEnter('Categories')}
              onMouseLeave={handleMouseLeave}>Categories</Nav.Link>
            <Nav.Link as={NavLink} to={'/products'}
              style={({ isActive }) => ({
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? 'red' : hoveredLink === 'Products' ? "red" : "white",
                borderRadius: "5px",
                backgroundColor: isActive ? "transparent" : hoveredLink === 'Products' ? 'white' : 'transparent',
              })}
              onMouseEnter={() => handleMouseEnter('Products')}
              onMouseLeave={handleMouseLeave}>Products</Nav.Link>

            

            {localStorage.getItem('userToken')?
              <>
              <Nav.Link as={NavLink} to={'/cart'} className='position-relative'
              style={({ isActive }) => ({
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? 'red' : hoveredLink === 'Cart' ? "red" : "white",
                borderRadius: "5px",
                backgroundColor: isActive ? "transparent" : hoveredLink === 'Cart' ? 'white' : 'transparent',
              })}
              onMouseEnter={() => handleMouseEnter('Cart')}
              onMouseLeave={handleMouseLeave}>
              Cart
              {cartCount > 0 ?
                <span class="position-absolute top-3 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                  <span class="visually-hidden">unread messages</span>
                </span>
                : ""
              }
            </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Welcome {user.userName}
                
                </Dropdown.Toggle>
  
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={'/profile'}>Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to={'/logout'}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </>
              :""  
          }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
