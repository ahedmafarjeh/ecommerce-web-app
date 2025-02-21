import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Container, ListGroup, Row, Table } from 'react-bootstrap';
import { toast } from 'react-toastify'
import Loading from '../../../components/loading/Loading';
import Swal from 'sweetalert2';

export default function Order() {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState();
  const [cancelLoading, setCancelLoading] = useState();
  const [removeLoading, setRemoveLoading] = useState();
  const [error, setError] = useState();


  const cancelOrder = async (orderID) => {

    try {
      setCancelLoading(true);
      const response = await axios.patch(`https://ecommerce-node4.onrender.com/order/cancel/${orderID}`,
        {},
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`,
          },
        }
      );
      setOrders(prevOrder => {
        return prevOrder.filter(order => order._id !== orderID);

      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCancelLoading(false);
    }
  }
  const removeRecord = (orderID) => {
    setOrders(prevOrder => {
      return prevOrder.filter(order => order._id !== orderID);
    });
  }
  const handleCancelOrder = (orderID, isCancel) => {
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
        isCancel ? cancelOrder(orderID) : removeRecord(orderID);
        Swal.fire({
          title: "Deleted!",
          text: isCancel ? "Item has been canceled." : "Item has been deleted",
          icon: "success",

        });
      }
    });
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
      setOrders(response.data.orders.filter(order => order.status !== 'cancelled'));
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
      <Container fluid className='my-4'>
        {error ? <div className='alert alert-danger'>{error}</div> :
          orders?.length == 0 ? <div className='alert alert-danger'>There are no orders</div>
            : <div className='table-responsive' >
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
                    <th>Cancel Order/Remove Record</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map(order =>
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
                      <td><Button onClick={() => handleCancelOrder(order._id, true)} variant='danger' disabled={order.status == 'deliverd' ? true : false}>
                        {cancelLoading ? <Loading /> : "Cancel"}
                      </Button>
                        <Button className='mt-3 p-2' onClick={() => handleCancelOrder(order._id, false)} variant='danger' disabled={order.status == 'deliverd' ? false : true}>
                          Remove Record
                        </Button>
                      </td>

                    </tr>


                  )}

                </tbody>
              </Table>
            </div>

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
