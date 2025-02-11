import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function CustomProduct({data,error}) {
  return (
    <>
      
        <div className="row g-5">
          {error ? <div className='alert alert-danger'>{error}</div> : 
           data.length === 0? <div className='alert alert-warning'>There are no products </div> : 
           data.map((product) =>
            <div className="col-lg-4">
              <Card className='w-75 h-100'>
                <Card.Img variant="top" src={product.mainImage.secure_url} />
                <Card.Body className='d-flex flex-column justify-content-between'>
                  <Card.Title>{product.name}</Card.Title>
                  <div className='d-flex justify-content-center'>
                    <Link className='btn btn-primary' to={`/products/${product._id}`}>More Details</Link>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>


      
    </>
  )
}
