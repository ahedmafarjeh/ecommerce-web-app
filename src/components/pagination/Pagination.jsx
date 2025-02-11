import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Box, Pagination as Paginate } from '@mui/material';
import { Badge, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './style.css'
export default function Pagination({ items, itemsPerPage, error }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the items to display
  // const currentItems = items?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const currentItems = items?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  // Handle page change
  // const handlePageChange = (data) => {
  //   setCurrentPage(data.selected);
  // };
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  return (
    <>

      <div className="row g-5">
        {error ? <div className='alert alert-danger'>{error}</div> :
          currentItems?.length === 0 ? <div className='alert alert-warning'>There are no products</div> :
            currentItems?.map((product) =>
              <div className="col-lg-4">
                <Card className='w-75 h-100'>
                  <Card.Img variant="top" src={product.mainImage.secure_url} />
                  <Card.Body className='d-flex flex-column justify-content-between text-center'>
                    <div className='mb-3 h-100 d-flex flex-column justify-content-between'>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Price: <Badge bg='success'>${product.finalPrice}</Badge></Card.Text>
                    </div>
                    
                    <div className='d-flex justify-content-center'>
                      <Link className='btn btn-primary' to={`/products/${product._id}`}>More Details</Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )}
      </div>

      <Paginate
        className='flex justify-content-center'
        count={Math.ceil(items?.length / itemsPerPage)} // Total number of pages
        page={currentPage} // Current page state
        onChange={handlePageChange} // Page change handler
        color="warning" // Color of the pagination buttons
        siblingCount={1} // Number of adjacent page buttons to display
        boundaryCount={1} // Number of boundary pages (first and last)
        showFirstButton // Show first page button
        showLastButton  // Show last page button
        variant="outlined" // Button style (outlined or text)
      />
      {/* <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(items.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      /> */}
    </>
  )
}
