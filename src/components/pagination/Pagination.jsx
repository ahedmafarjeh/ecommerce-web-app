import React, { useState } from 'react';
import { Box, Pagination as Paginate } from '@mui/material';
import './style.css'
import CustomProduct from '../product/CustomProduct';
export default function Pagination({ items, itemsPerPage, error }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the items to display
  const currentItems = items?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  return (
    <>

      <CustomProduct data={currentItems} error={error} />

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
  
    </>
  )
}
