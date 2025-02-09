import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../../components/useFetch/useFetch';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Loading from '../../../components/loading/Loading';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
import { CartContext } from '../../../components/user/context/CartContext';

export default function Product() {
  const navigate = useNavigate();
  const [addToCardLoading, setAddToCardLoading] = useState();
  const {cartCount, setCartCount} = useContext(CartContext); 
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

  const addProductToCart = async () => {
    if(!localStorage.getItem('userToken')){
      toast.error('Please sign in to add product to cart', {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      return;  
    }
    try{
      setAddToCardLoading(true);
      const response = await axios.post('https://ecommerce-node4.onrender.com/cart',
        {
          productId: productID,
        },
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`
          }
        }
      );
      if(response.status === 201){
        toast.success('Product added successfuly', {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        setCartCount(cartCount + 1);
        navigate('/cart');
      }
    }catch(e){
      console.log(e);
    }finally{
      setAddToCardLoading(false);
    }
  }

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
                <button onClick={addProductToCart} className='btn btn-primary'>
                  {addToCardLoading? <Loading /> : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
