import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, Links, useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import Loading from '../../../components/loading/Loading';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const signin = async (userData) => {
    try {
      setIsLoading(true);
      const response = await axios.post('https://ecommerce-node4.onrender.com/auth/signin', userData);
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("userToken", response.data.token);
        navigate('/');
      }
    } catch (error) {
      setServerError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }

  }
  return (
    <>
      <div className="container">
        <form className='mt-5' onSubmit={handleSubmit(signin)}>

          {serverError ? <div className='text-danger'>{serverError}</div> : ""}
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="my-3 text-light"
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
          <Link to={'/auth/send_code'}>Forget password?</Link>
          <br />
          <Button className='mt-3' type='submit' variant="danger" disabled={isLoading}>
            {isLoading ? <Loading /> : "Login"}
          </Button>

        </form>
        <p className='text-white mt-3'>Don't have an account? Please <Link className='text-danger' to={'/auth/register'}>Register</Link> here</p>
      </div>
    </>
  )
}
