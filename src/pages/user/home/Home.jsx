import React, { useContext } from 'react'
import useFetch from '../../../components/useFetch/useFetch';
import Loading from '../../../components/loading/Loading';
import style from './homeStyle.module.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Container } from 'react-bootstrap';
import { UserContext } from '../../../components/user/context/UserContext';
import CustomProduct from '../../../components/product/CustomProduct';

export default function Home() {
  const {loadingUser} = useContext(UserContext);
  const { data:cdata, error:cerror, loading:cloading } = useFetch('https://ecommerce-node4.onrender.com/categories/active')
  const { data:productsData, error:perror, loading:ploading } = useFetch('https://ecommerce-node4.onrender.com/products?sort=avgRating')
  // console.log("hhhhhhhhhhhhhhhh");
  // console.log(productsData.products);
  if (cloading || ploading) {
    return (
      <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    )


  }
  return (
    <>
    <Container >
      <Swiper
      className='my-5'
      modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3.3}
        navigation
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {cdata?.categories.map((category) =>
          <SwiperSlide>
            <img src={category.image.secure_url} alt={category.name} className={style.custom_width} />
          </SwiperSlide>

        )}

      </Swiper>
      <CustomProduct  data={productsData?.products} error={perror}  />
    </Container>
    
      
    </>
  )
}
