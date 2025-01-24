import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../../../components/useFetch/useFetch';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Loading from '../../../components/loading/Loading';

export default function Product() {
  const { productID } = useParams();
  const [imgSrc, setImgSrc] = useState('');
  const { data, error, loading } = useFetch(`https://ecommerce-node4.onrender.com/products/${productID}`)
  const targetImg = (e) => {
    console.log(e.target.currentSrc);
    setImgSrc(e.target.currentSrc);
  }
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa fa-star ${i <= rating ? 'text-warning' : 'text-muted'}`} // 'text-warning' for gold, 'text-muted' for gray
        ></i>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    )
  }
  return (
    <>
      <section className='product'>
        <div className="container py-5">
          <div className="row text-light">
            <div className="col-md-6">
              <img src={imgSrc ? imgSrc : data.product.mainImage.secure_url} alt={data.product.name} className='w-50 h-50' />
              <Swiper
                className='mt-5'
                spaceBetween={50}
                slidesPerView={3}

              >
                {
                  data.product.subImages.map((image, index) => (
                    <SwiperSlide className='w-25 h-25' key={index}>
                      <img onClick={targetImg} src={image.secure_url} alt={data.product.name} className='img-fluid' />
                    </SwiperSlide>
                  ))
                }




              </Swiper>
            </div>
            <div className="col-md-6">
              <h1 className='text-danger'>{data.product.name}</h1>
              <p className="card-text  ">Rating: {renderStars(Math.round(data.avgRating))} </p>
              <p>{data.product.description}</p>
              <p class="badge bg-info text-dark">Available: {data.product.status ? "Yes" : "Not"}</p>
              <div className='mt-2'>
                <p class="badge bg-success py-3 fs-6 position-relative">
                  Price: ${data.product.finalPrice.toFixed(2)}
                  {data.product.discount == 0 ? '' :
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      <small className='text-decoration-line-through fs-6'> ${data.product.price.toFixed(2)}</small>
                    </span>
                  }
                </p>
              </div>

              <div className='d-flex justify-content-center'>
                <button className='btn btn-primary'>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
