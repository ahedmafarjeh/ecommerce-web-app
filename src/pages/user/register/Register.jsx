import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import Loading from '../../../components/loading/Loading';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const [serverError,setServerError] = useState("");
  const signup = async (userData) => {
    try {
      setIsLoading(true);
      const response = await axios.post('https://ecommerce-node4.onrender.com/auth/signup', userData);
      console.log(response);
      if (response.status === 201) {
        toast.success('please check your email for verification', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      if(error.response.status == 409){
        setServerError("Email already exists");
      }
      else{
        setServerError("Something went wrong, please try again");
      }
    }finally{
      setIsLoading(false);
    }

  }
  return (
    <>
      <form onSubmit={handleSubmit(signup)}>
        <div className="container">
        {serverError? <div className='text-danger'>{serverError}</div> : ""}
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="my-3 text-light"
          >
            <Form.Control type="text" {...register("userName", { required: "please enter username" })} placeholder="" />
          </FloatingLabel>
          {errors.userName ? <div className='text-danger'>{errors.userName.message}</div> : ""}
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3 text-light"
          >
            <Form.Control type="email" {...register("email", { required: "please enter email" })} placeholder="" />
          </FloatingLabel>
          {errors.email ? <div className='text-danger'>{errors.email.message}</div> : ""}
          <FloatingLabel
            controlId="floatingInput"
            label="Password"
            className="mb-3 text-light"
          >
            <Form.Control type="password" {...register("password", { required: "please enter password" })} placeholder="" />
          </FloatingLabel>
          {errors.password ? <div className='text-danger'>{errors.password.message}</div> : ""}
          <Button type='submit' variant="primary" disabled={isLoading}>
            {isLoading ? <Loading /> : "Register"}
          </Button>
        </div>
      </form>
    </>
  )
}
