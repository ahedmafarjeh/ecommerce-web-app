import React from 'react'
import useFetch from '../../../components/useFetch/useFetch';
import Loading from '../../../components/loading/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Container } from 'react-bootstrap';

export default function Home() {
  const { data, error, loading } = useFetch('https://ecommerce-node4.onrender.com/categories/active')
  console.log(data.categories);
  if (loading) {
    return (
      <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    )


  }
  return (
    <>
    <Container fluid>
      <Swiper
      className='mt-5'
        spaceBetween={20}
        slidesPerView={3.3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.categories.map((category) =>
          <SwiperSlide>
            <img src={category.image.secure_url} alt={category.name} className='img-fluid w-50' />
          </SwiperSlide>

        )}

      </Swiper>
    </Container>
      
    </>
  )
}
