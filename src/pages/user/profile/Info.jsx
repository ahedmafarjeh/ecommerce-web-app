import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../../components/user/context/UserContext';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
export default function Info() {
  const { user } = useContext(UserContext);
  const { register, handleSubmit, setValue } = useForm();
  const [nameDisabled, setNameDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const enableNameInput = (e) => {
    e.preventDefault();
    setNameDisabled(false);
  }
  const enableEmailInput = (e) => {
    e.preventDefault();
    setEmailDisabled(false);
  }
  const getUserInfo = () => {
    setValue('username', user?.userName);
    setValue('email', user?.email);

  }
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
      <Form className='mt-3 mx-3'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='text-white'>Username</Form.Label>
          <div className='position-relative'>
            <Form.Control type="text" {...register('username')} readOnly={nameDisabled} />
            <button onClick={enableNameInput} className=' btn  position-absolute top-0 end-0'>✏️</button>
          </div>

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='text-white'>Email address</Form.Label>
          <div className='position-relative'>
            <Form.Control  type="email" {...register('email')} readOnly={emailDisabled} />
            <button onClick={enableEmailInput} className=' btn position-absolute top-0 end-0'>✏️</button>
          </div>
        </Form.Group>
        <Button variant="danger" type="submit" disabled={nameDisabled && emailDisabled ? true:false}>
        Save
      </Button>
      </Form>
    </>
  )
}
