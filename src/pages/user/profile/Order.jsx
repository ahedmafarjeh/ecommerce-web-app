import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Container, ListGroup, Row, Table } from 'react-bootstrap';
import { toast } from 'react-toastify'
import Loading from '../../../components/loading/Loading';

export default function Order() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState();
  const [cancelLoading, setCancelLoading] = useState();
  const [error, setError] = useState();
  const cancelOrder = async (orderID) =>{
    
    try {
      setCancelLoading(true);
      const response = await axios.patch(`https://ecommerce-node4.onrender.com/order/cancel/${orderID}`,
        {
          headers: {
            Authorization:`Tariq__${localStorage.getItem('userToken')}`,
          },
        }
      );
      console.log(response);
      setOrders(prevOrder =>{
        return prevOrder.filter(order=> order._id !== orderID);
      });
    } catch (error) {
      toast.error(error.message);
    }finally{
      setCancelLoading(false);
    }
  }
  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://ecommerce-node4.onrender.com/order',
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`,
          },
        }
      );
      setOrders(response.data.orders);
      setError();
    } catch (e) {
      setError(error.message);
    } finally {
      setLoading(false);

    }
  }
  useEffect(() => {
    getOrders();
  }, []);
  if (loading) {
    return (
      <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
        <Loading />
      </div>
    )
  }
  return (
    <>
      <Container className='my-4'>
        {error ? <div className='alert alert-danger'>{error}</div> :
          <Table variant='dark' striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Products - Quantity</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Created Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Cancel Order</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order =>
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    <ul>
                      {order.products.map(product =>
                        <li key={product._id}>{product.productId.name} - {product.quantity}</li>
                      )}
                    </ul>
                  
                    </td>
                  <td>{order.address}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.createdAt}</td>
                  <td><Badge bg="success">${order.finalPrice}</Badge></td>
                  <td>{order.status}</td>
                  <td><Button onClick={() => cancelOrder(order._id)} variant='danger'>
                    {cancelLoading? <Loading /> : "Cancel"}
                    </Button></td>
                </tr>


              )}

            </tbody>
          </Table>
        }

        {/* <Row className='g-3'>
          {!orders ? <div className='alert alert-danger'>There is no orders</div> : orders.map((order) =>
            <Col md={4} >
              <Card className='text-white' bg='dark' style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Order ID: {order._id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                  <Card.Text>
                    <p>products</p>
                    <ListGroup>
                      {order.products.map((product) =>
                        <ListGroup.Item>{product.productId.name} - {product.quantity}</ListGroup.Item>
                      )}
                    </ListGroup>
                    <p>Total Price: <Badge bg="success">${order.finalPrice}</Badge> </p>
                    <p>Adress: {order.address}</p>
                    <p>Phone Number: {order.phoneNumber}</p>
                    <p>Created Date: {order.createdAt}</p>
                    <p>Status: {order.status}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row> */}
      </Container>
    </>
  )
}
