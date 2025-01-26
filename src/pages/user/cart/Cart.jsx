import React, { useEffect, useState } from 'react'
import useFetch from '../../../components/useFetch/useFetch'
import axios from 'axios';
import { toast } from 'react-toastify';
import Table from 'react-bootstrap/Table';
import Loading from '../../../components/loading/Loading';
export default function Cart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const getCartProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('https://ecommerce-node4.onrender.com/cart',
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`,
          },
        }

      );
      setCart(data.products);
      setError();
    } catch (e) {
      setError(e.response.data.message);


    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCartProducts();
  }, []);

  if (loading) {
    return (
      <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    );
  }
  return (
    <>
      <div className="container-fluid">
        {error ? <div className='alert alert-danger'>{error}</div> :
          <Table striped bordered hover variant="dark" >
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) =>
                <tr key={product._id}>
                  <td><img src={product.details.mainImage.secure_url} alt={product.details.name} className='w-25' /></td>
                  <td>{product.details.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.details.finalPrice}</td>
                  <td className='text-danger fw-bold'>{product.quantity * product.details.finalPrice}</td>
                </tr>
              )}

            </tbody>
          </Table>
        }
      </div>
    </>
  )
}
