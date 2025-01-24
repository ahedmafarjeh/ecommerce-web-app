import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../../../components/useFetch/useFetch'
import CustomProduct from '../../../components/product/CustomProduct';
import Loading from '../../../components/loading/Loading';

export default function CategoryProducts() {
  const { categoryID } = useParams();
  const { data, error, loading } = useFetch(`https://ecommerce-node4.onrender.com/products/category/${categoryID}`);
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
      <section className='categorty-product'>

        <div className="container py-5">
        <CustomProduct data={data.products} error={error} />
        </div>
      </section>
    </>
  )
}
