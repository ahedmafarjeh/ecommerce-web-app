import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import style from './navbarStyle.module.css'

export default function CustomNavbar() {
  return (
    <Navbar expand="lg" className={style.darknav}>
      <Container>
        <Navbar.Brand className='text-light' href="#home">Ahed-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link}  to={'/login'}>Login</Nav.Link>
            <Nav.Link as={Link}  to={'/register'}>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
