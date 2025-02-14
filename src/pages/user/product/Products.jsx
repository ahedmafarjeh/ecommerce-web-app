import React, { useEffect, useRef, useState } from 'react';
import useFetch from '../../../components/useFetch/useFetch';
import CustomProduct from '../../../components/product/CustomProduct';
import Loading from '../../../components/loading/Loading';
import Pagination from '../../../components/pagination/Pagination';
import SearchIcon from '@mui/icons-material/Search'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Try } from '@mui/icons-material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Products() {
  const { data, setData, error, loading } = useFetch('https://ecommerce-node4.onrender.com/products?limit=10')
  const { register, handleSubmit, reset } = useForm();
  const [sortLoading, setSortLoading] = useState(false);
  const [searchLodaing, setSearchLodaing] = useState();
  const [priceRangeLodaing, setPriceRangeLodaing] = useState();
  const [selected, setSelected] = useState();
  const selectionRef = useRef(selected);
  const searchProducts = async (input) => {
    console.log(input.search);

    try {

      if (input.price.gte || input.price.lte) {
        setPriceRangeLodaing(true);
        const response = await axios.get(`https://ecommerce-node4.onrender.com/products?price[gte]=${input.price.gte}&&price[lte]=${input.price.lte}`);
        setData(response.data)
      }
      else {
        setSearchLodaing(true);
        const response = await axios.get(`https://ecommerce-node4.onrender.com/products?search=${input.search}`);
        setData(response.data)
      }
      // setSearchLodaing(true);
      // const response = await axios.get(`https://ecommerce-node4.onrender.com/products?search=${input.search}`);
      // setData(response.data);

    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setSearchLodaing(false);
      setPriceRangeLodaing(false);
      reset();
    }
  }
  // const priceRangeSearch = async (input) => {
  //   try {
  //     setPriceRangeLodaing(true);
  //     const response = await axios.get(`https://ecommerce-node4.onrender.com/products?price[gte]=${input.price.gte}&&price[lte]=${input.price.lte}`);
  //     setData(response.data.products)
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   } finally {
  //     setPriceRangeLodaing(false);
  //   }
  // }

  const handleDropDownSelection = async (selection) => {
    setSelected(selection);
    selectionRef.current = selection;
    try {
      setSortLoading(true);
      const response = await axios.get(`https://ecommerce-node4.onrender.com/products?limit=10&&sort=${selectionRef.current}`);
      setData(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setSortLoading(false);

    }
  }

  if (loading || sortLoading) {
    return (
      <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    )
  }
  return (
    <>
      <section className='products'>

        <div className='px-3 bg-dark'    >
          <Container fluid className='py-3 text-white d-flex align-items-center flex-wrap gap-2'>

            <div
              className="me-auto "


            >

              <NavDropdown className='fs-5 border rounded py-3 px-4' style={{ backgroundColor: '#22303c' }} onSelect={handleDropDownSelection} title={selected ? `sorted by ${selected}` : "sort options"} id="basic-nav-dropdown">
                <NavDropdown.Item eventKey="name">Name (Ascending)</NavDropdown.Item>
                <NavDropdown.Item eventKey="finalPrice">Price (Ascending)</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="-name">Name (Descending)</NavDropdown.Item>
                <NavDropdown.Item eventKey="-finalPrice">Price (Descending)</NavDropdown.Item>
              </NavDropdown>
            </div>


            <Form onSubmit={handleSubmit(searchProducts)} className="d-flex flex-wrap gap-2 ">
              <div  className="d-flex flex-wrap gap-2 ">
                <Form.Control
                  type="text"
                  placeholder="Min price"
                  className="me-2 w-auto"
                  aria-label="Maxprice"

                  {...register('price[lte]')}
                />
                <Form.Control
                  type="text"
                  placeholder="Max price"
                  className="me-2 w-auto"
                  aria-label="Minprice"
                  {...register('price[gte]')}
                />
                <Button type='submit' variant="outline-success">
                  {priceRangeLodaing ? <Loading /> : <SearchIcon />}
                </Button>
              </div>

              <p className='text-white mx-3 mt-3 fs-5'>or</p>
              <div  className="d-flex flex-wrap gap-2 ">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 w-auto"
                  aria-label="Search"
                  {...register('search')}
                />
                <Button type='submit' variant="outline-success">
                  {searchLodaing ? <Loading /> : "Search"}
                </Button>
              </div>

            </Form>

          </Container>
        </div>


        <h1 className='text-center text-danger my-3'>All Products</h1>
        <div className="container py-5">
          {/* <CustomProduct data = {data.products} error = {error}/> */}
          <Pagination items={data.products} itemsPerPage={3} error={error} />
        </div>

      </section>
    </>
  )
}
