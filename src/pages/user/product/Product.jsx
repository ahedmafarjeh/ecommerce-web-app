import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../../components/useFetch/useFetch';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Loading from '../../../components/loading/Loading';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
import { CartContext } from '../../../components/user/context/CartContext';
import ReactStars from 'react-rating-stars-component';
import { Badge, Button, FloatingLabel, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
export default function Product() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [addToCardLoading, setAddToCardLoading] = useState();
  const [reviewLoading, setReviewLoading] = useState();
  const { cartCount, setCartCount } = useContext(CartContext);
  const { productID } = useParams();
  const [imgSrc, setImgSrc] = useState('');
  const [showReview, setShowReview] = useState(false);
  const [orders, setOrders] = useState();
  const [error1, setError] = useState();
  const [rating, setRating] = useState(0);
  const { data, error, loading } = useFetch(`https://ecommerce-node4.onrender.com/products/${productID}`)
  const targetImg = (e) => {
    console.log(e.target.currentSrc);
    setImgSrc(e.target.currentSrc);
  }
  // const renderStars = (rating) => {
  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     stars.push(
  //       <i
  //         key={i}
  //         className={`fa fa-star ${i <= rating ? 'text-warning' : 'text-muted'}`} // 'text-warning' for gold, 'text-muted' for gray
  //       ></i>
  //     );
  //   }
  //   return stars;
  // };

  const addProductToCart = async () => {
    if (!localStorage.getItem('userToken')) {
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
    try {
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
      
      if (response.data && response.data.message) {
        console.log(response.data.message);  // Set the message from the API response
      }
      
      if (response.status === 201) {
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
    } catch (e) {
      // toast.error(e.message);
      toast.error(e.response.data.message)
    } finally {
      setAddToCardLoading(false);
    }
  }
  const show = () => {
    setShowReview(!showReview);
  }
  const getOrders = async () => {
    try {
      // setLoading(true);
      const response = await axios.get('https://ecommerce-node4.onrender.com/order',
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`,
          },
        }
      );
      // console.log(response.data);
      setOrders(response.data.orders.filter(order => order.status !== 'cancelled'));
      setError();
      // checkProductOrdered();
      // console.log("tttttttttttttttt");
      // console.log(showReview);
    } catch (e) {
      setError(error.message);
    } finally {
      // setLoading(false);

    }
  }
  const checkProductOrdered = () => {
    //  orders.some(order => order.products.some(product => product._id == productID));
    console.log("the products are:");
    orders?.forEach(order => {
      // console.log(order);
      if (order.products?.some(product => product.productId._id == productID)) {
        setShowReview(true);
      }
    })
  }
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const saveReview = async (data) => {
    // console.log(data.comment);
    // console.log(rating);
    try {
      setReviewLoading(true);
      const responce = await axios.post(`https://ecommerce-node4.onrender.com/products/${productID}/review`,
        {
          comment: data.comment,
          rating: rating
        },
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`,
          }
        }
      );
      console.log(responce);
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      setReviewLoading(false);
    }
  }
  useEffect(() => {
    getOrders();
  }, []);
  useEffect(() => {
    checkProductOrdered();
  }, [orders]);
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
              <ReactStars
                count={5}               // Number of stars
                size={30}               // Size of the stars
                activeColor="#ffd700"   // Active color for selected stars (gold)
                value={data.avgRating}          // Set initial value (the current rating)
                edit={false}
              />
              {/* <p className="card-text  ">Rating: {renderStars(Math.round(data.avgRating))} </p> */}
              <p>{data.product.description}</p>
              <p className='text-info fs-5 mb-4' >Available: <Badge bg='success' text='dark'>{data.product.status ? "Yes" : "Not"}</Badge></p>
              <div className='mt-2'>
                <p className='text-info fs-5'>
                  <small className='me-2'>Price:</small>
                <span class="badge bg-success py-3 fs-6 position-relative">
                   ${data.product.finalPrice.toFixed(2)}
                  {data.product.discount == 0 ? '' :
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      <small className='text-decoration-line-through fs-6'> ${data.product.price.toFixed(2)}</small>
                    </span>
                  }
                </span>
                </p>
              </div>

              <div className='d-flex justify-content-center'>
                <button onClick={addProductToCart} className='btn btn-primary'>
                  {addToCardLoading ? <Loading /> : "Add to Cart"}
                </button>
              </div>
              <div>
                {showReview ?
                  <div>
                    <Form onSubmit={handleSubmit(saveReview)}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Comment"
                        className="mt-3 text-light"
                      >
                        <Form.Control type="text" {...register("comment", { required: "please enter comment" })} placeholder="" />
                        {errors.comment ? <div className='text-danger'>{errors.comment.message}</div> : ""}
                      </FloatingLabel>
                      <div className='d-flex align-items-center gap-3'>
                        <span className='text-white d-block'>Your Rating:</span>
                        <ReactStars
                          count={5}
                          onChange={ratingChanged}
                          size={30}
                          value={rating}
                          activeColor="#ffd700"
                          isHalf={true}
                        />
                      </div>
                      <Button type='submit' className='mt-3'>
                        {reviewLoading ? <Loading /> : 'Save Review'}
                      </Button>

                    </Form>

                  </div>
                  : ""}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
