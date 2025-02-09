import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import style from './navbarStyle.module.css'
import { Link } from 'react-router-dom'
export default function AuthNavbar() {
  return (
    <Navbar expand="lg" sticky='top' className={style.darknav}>
    <Container>
      <Navbar.Brand className='text-light' as={Link} to={'/'}>Ahed-Shop</Navbar.Brand>
      
    </Container>
  </Navbar>
  )
}
