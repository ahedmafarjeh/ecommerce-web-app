import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
export default function Loading() {
  return (
      <Spinner animation="border" role="status" variant="danger">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
  

  )
}
