import React from 'react'
import MyImg from '../../assets/imgs/store.svg'
export default function About() {
  return (
    <>
    <section className='about py-5 text-white' >
      <p className='fs-2 text-center mb-4 text-danger'>About Us</p>    
      <div className="container ">
        <div className="row">
          <div className="col-lg-6 ps-5 d-flex align-items-center ">
            <p  >Welcome to <span className='text-info fs-5'>Ahed Shop</span>, your one-stop destination for all your shopping needs! We offer a wide variety of products across multiple categories, including the latest mobile phones, exciting games, and toys for all ages. Our collection also features personal care essentials to keep you feeling your best, as well as home and kitchen items that make everyday life more convenient. With a focus on quality and affordability, we strive to bring you the best selection from trusted brands, all with fast and reliable service. Shop with us today and discover great deals for every part of your life!</p>  
          </div>  
          <div className="col-lg-6 text-center">
            <img className='img-fluid w-50' src={MyImg} alt="store image" />
          </div>
          
        </div>  
      </div>  
    </section>
    </>
  )
}
