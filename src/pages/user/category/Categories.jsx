import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useFetch from '../../../components/useFetch/useFetch'

import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';

export default function Categories() {
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
      <section className='categories'>
        <h1 className='text-center text-danger my-3'>All Categories</h1>
        <div className="container py-5">
          <div className="row g-5">
            {error ? <div className='alert alert-danger'>{error}</div> :  data.categories.map((category) =>
              <div className="col-lg-4">
                <Card className='w-75'>
                  <Card.Img variant="top" src={category.image.secure_url} />
                  <Card.Body className='d-flex justify-content-center'>
                    <Link className='btn btn-primary'  to={`/categories/${category._id}`}>See Products</Link>
                  </Card.Body>
                </Card>
              </div>
            )}
          </div>
        </div>

      </section>
    </>
  )
}
