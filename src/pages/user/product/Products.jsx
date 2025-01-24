import React from 'react';
import useFetch from '../../../components/useFetch/useFetch';

import CustomProduct from '../../../components/product/CustomProduct';
import Loading from '../../../components/Loading/Loading';
export default function Products() {
  const { data, error, loading } = useFetch('https://ecommerce-node4.onrender.com/products?limit=10')
  console.log(data.products);
  if (loading) {
    return (
      <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    )
  }
  return (
    <>
      <section className='products'>
        <h1 className='text-center text-danger my-3'>All Products</h1>
        <div className="container py-5">
          <CustomProduct data = {data.products} error = {error}/>
        </div>

      </section>
    </>
  )
}
