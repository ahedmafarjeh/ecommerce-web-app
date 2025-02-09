import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Loading from '../../../components/loading/Loading';
import { useNavigate } from 'react-router-dom';

export default function SendCode() {
  const navigate = useNavigate();
  const {register,handleSubmit} = useForm();
  const [loading, setLodaing] = useState();
  const send = async (data) =>{
  
    try {
      setLodaing(true);
      const response = await axios.patch('https://ecommerce-node4.onrender.com/auth/sendcode',
        {
          email: data.email
        }
      );
      if(response.status == 200){
          localStorage.setItem('uemail', data.email);
          navigate('/auth/forget_password');
      }
      
    } catch (error) {
      
    }finally{
      setLodaing(false);
    }
  }
  return (
    <>
      <Container>
      <Form onSubmit={handleSubmit(send)}>
        <FloatingLabel
          controlId="floatingInput"
          label="Email"
          className="my-3 text-light"
        >
          <Form.Control type="email" {...register("email", { required: "please enter email" })} placeholder="" />
        </FloatingLabel>
        <Button type='submit' variant='danger'>
          {loading? <Loading /> : "Send Code"}
          </Button>
      </Form>
      </Container>
    </>
  )
}
