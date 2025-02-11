import React, { useContext } from 'react'
import useFetch from '../../../components/useFetch/useFetch';
import Loading from '../../../components/loading/Loading';
import style from './homeStyle.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Container } from 'react-bootstrap';
import { UserContext } from '../../../components/user/context/UserContext';

export default function Home() {
  const {loadingUser} = useContext(UserContext);
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
        {data?.categories.map((category) =>
          <SwiperSlide>
            <img src={category.image.secure_url} alt={category.name} className={style.custom_width} />
          </SwiperSlide>

        )}

      </Swiper>
    </Container>
      
    </>
  )
}
