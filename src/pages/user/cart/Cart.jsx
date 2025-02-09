import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../../../components/useFetch/useFetch'
import axios from 'axios';
import { toast } from 'react-toastify';
import Table from 'react-bootstrap/Table';
import Loading from '../../../components/loading/Loading';
import { Badge, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card';
import { CartContext } from '../../../components/user/context/CartContext';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

export default function Cart() {
  const { register, handleSubmit } = useForm();
  const [cart, setCart] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [orderLoading, setOrderLoading] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { cartCount, setCartCount } = useContext(CartContext);

  const removeItem = async (productID) => {
    try {
      const response = await axios.patch('https://ecommerce-node4.onrender.com/cart/removeItem',
        {
          productId: productID
        },
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`,
          },
        }
      );
      if (response.status == 200) {
        setCart(prevCart => {
          return prevCart.filter(product => {
            return product.productId !== productID;
          });
        });
        setCartCount(cartCount - 1);
      }

    } catch (e) {
      toast.error(e.message);
    }
  }
  const handleRemove = (productID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(productID);
        Swal.fire({
          title: "Deleted!",
          text: "Item has been deleted.",
          icon: "success"
        });
      }
    });
  }
  const clearCart = async () => {
    try {
      const response = await axios.patch('https://ecommerce-node4.onrender.com/cart/clear',
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`,
          },
        }
      );
      console.log(response);
    } catch (e) {
      toast.error(e.message);
    }
  }
  const incQuantity = (productID) => {

    try {
      const response = axios.patch('https://ecommerce-node4.onrender.com/cart/incraseQuantity',
        {
          productId: productID
        },
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`,
          },
        }
      );
      setCart(prevCart => {
        return prevCart.map(product => {
          if (product.productId === productID) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        })
      });
    } catch (e) {
      console.error(e);
    }
  }

  const decQuantity = (productID, quantity) => {
    if (quantity <= 1) {
      toast.error('Cannot decrease quantity below 1');
      return;
    }

    try {
      const response = axios.patch('https://ecommerce-node4.onrender.com/cart/decraseQuantity',
        {
          productId: productID
        },
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`,
          },
        }
      );
      setCart(prevCart => {
        return prevCart.map(product => {
          if (product.productId === productID) {

            return { ...product, quantity: product.quantity - 1 };

          }
          return product;
        })
      });
    } catch (e) {
      toast.error(e.message);
    }
  }

  const creatOrder = async (data) => {

    try {
      setOrderLoading(true);
      const response = await axios.post('https://ecommerce-node4.onrender.com/order',
        {
          couponName: data.couponName,
          address: data.address,
          phone: data.phone
        },
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`,
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Order placed successfully!",
          text: "Your order has been placed",
          icon: "success"
        });
        setCart([]);
        setCartCount(0);
      }

    } catch (e) {
      toast.error(e.message);
    } finally {
      setOrderLoading(false);
      setShow(false);
    }
  }

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
        <div className="row">
          <div className="col-md-8">
            {error ? <div className='alert alert-danger'>{error}</div> :
              cart.length == 0 ? <div className='alert alert-danger'>There are no products in cart</div>
                : <Table striped bordered hover variant="dark" >
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
                        <td><img src={product.details.mainImage.secure_url} alt={product.details.name} className='w-50' /></td>
                        <td>
                          <div>
                            <p>{product.details.name}</p>
                            <Button onClick={() => handleRemove(product.productId)}>Remove Item</Button>
                          </div>
                        </td>
                        <td className='fw-bold ' style={{ width: '15%' }}>
                          <Button className='me-2' onClick={() => decQuantity(product.productId, product.quantity)} variant='danger'>-</Button>
                          {product.quantity}
                          <Button className='ms-2' onClick={() => incQuantity(product.productId)} variant='danger'>+</Button>
                        </td>
                        <td>{product.details.finalPrice}</td>
                        <td><span className='bg-success rounded p-1'>{product.quantity * product.details.finalPrice}</span></td>
                      </tr>
                    )}

                  </tbody>
                </Table>
            }
          </div>
          <div className="col-md-4 text-white">
            <Card className="text-center text-white" border='danger' bg='dark'>
              <Card.Header as={"h5"}>Cart Summary</Card.Header>
              <Card.Body>
                <Card.Title>Price</Card.Title>
                <Card.Text>
                  <p>Total Price: <Badge bg="success">

                    {cart.reduce((acc, product) => acc + (product.quantity * product.details.finalPrice), 0)}
                  </Badge></p>
                </Card.Text>

              </Card.Body>
              <Card.Footer className="text-muted">
                <Button onClick={clearCart} variant='success' className='me-5' >Clear</Button>
                <Button onClick={handleShow} variant='success' >Create Order</Button>
              </Card.Footer>
            </Card>


          </div>
        </div>

      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(creatOrder)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Coupon Name</Form.Label>
              <Form.Control
                {...register('couponName')}
                type="text"
                placeholder="Optional"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                {...register('address')}
                type="text"


              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                {...register('phone')}
                type="number"


              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type='submit' variant="primary" >
                {orderLoading ? <Loading /> : "Create"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>

      </Modal>
    </>
  )
}
