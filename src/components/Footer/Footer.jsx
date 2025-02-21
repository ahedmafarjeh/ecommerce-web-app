import React from 'react'
import Icon from './Icon'
import style from './footer.module.css'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
export default function Footer() {
  return (
    <>
      <footer className={`footer text-center ${style.footer}`}>
        <div className="container pt-5">
          <div className="row">
            <div className="col-lg-4 mb-5 ">
              <h2 className='text-white fs-2 mb-4'>Location</h2>
              <p className='fs-5  '>Online Shop</p>
            </div>
            <div className="col-lg-4 mb-5 ">
              <h2 className='text-white fs-2 mb-4 '>Around the Web</h2>
              <div className={`icons d-flex gap-3 justify-content-center`}>
                
                  <Icon  iconName='facebook' /> 
                  <Icon iconName='twitter' />  
                  <Icon iconName='linkedin' />  
                  <Icon iconName='instagram' />              
                
              </div>
            </div>
            <div className="col-lg-4 mb-5 ">
              <h2 className='text-white fs-2 mb-4'>About</h2>
              <p className='fs-5  '>
                click <Link to={'/about'} style={{ color: '#1ABC9C' }}> Ahed shop</Link> for about us
                 .
              </p>
            </div>
          </div>
        </div>
        <div className="end-footer py-4  ">
          
          <p className='m-0'>Copyright &copy; Ahed Shop 2025</p>
          
        </div>
      </footer>
    </>
  )
}
