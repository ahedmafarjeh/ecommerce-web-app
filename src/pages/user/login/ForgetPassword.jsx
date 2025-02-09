import axios from 'axios';
import React, { useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import Loading from '../../../components/loading/Loading';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  const navigate = useNavigate();
  const {register,handleSubmit,formState:{errors}} = useForm();
  const [loading, setLoading] = useState();
  const resetPassword = async (data) =>{
    if(data.password!== data.confirm_password){
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.patch('https://ecommerce-node4.onrender.com/auth/forgotPassword',
        {
          email: localStorage.getItem('uemail'),
          password: data.password,
          code: data.code
        }
      );
      if(response.status == 200){
        toast.success("Password reset successful");
        localStorage.removeItem('uemail');
        navigate('/auth/login');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  }
  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(resetPassword)}>

        
          <FloatingLabel
            controlId="floatingInput"
            label="New Password"
            className="my-3 text-light"
          >
            <Form.Control type="password" {...register("password", { required: "please enter password" })} placeholder="" />
          </FloatingLabel>
          {errors.password ? <div className='text-danger'>{errors.password.message}</div> : ""}
          <FloatingLabel
            controlId="floatingInput"
            label="Password Confirmation"
            className="mb-3 text-light"
          >
            <Form.Control type="password" {...register("confirm_password", { required: "please re-enter password" })} placeholder="" />
          </FloatingLabel>
          {errors.confirm_password ? <div className='text-danger'>{errors.confirm_password.message}</div> : ""}
          <FloatingLabel
            controlId="floatingInput"
            label="Code"
            className="mb-3 text-light"
          >
            <Form.Control type="text" {...register("code",{required:'please enter code that sent to your email'})} placeholder="" />
          </FloatingLabel>
          {errors.code ? <div className='text-danger'>{errors.code.message}</div> : ""}
          <Button className='mt-3' type='submit' variant="danger" >
            {loading? <Loading /> : "Reset Password"}
          </Button>

        </Form>
      </Container>
    </>
  )
}
