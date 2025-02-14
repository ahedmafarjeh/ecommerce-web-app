import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { UserContext } from '../../../components/user/context/UserContext';
import Loading from '../../../components/loading/Loading';

export default function Image() {
  const { register, handleSubmit } = useForm();
  const { user , setUser } = useContext(UserContext);
  const [isLodding, setIsLoading] = useState(false);
  const [ profileImg, setProfileImg ] = useState(null);
  
  const updateImage = async (data) => {
    // console.log(data.image[0]);
    const formdata = new FormData();
    formdata.append('image', data.image[0]);
    try {
      setIsLoading(true);
      const response = await axios.put('https://ecommerce-node4.onrender.com/user/update-image',
        formdata,
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`,

          }
        }

      );
     console.log("my response");
      console.log(response);
      if (response.status === 200) {
        toast.success('Image updated successfully');
        setProfileImg(response.data.user.image.secure_url);
        setUser(prevUser =>{
          return {...prevUser, image:{'public_id':response.data.user.image.public_id,'secure_url': response.data.user.image.secure_url}};
        });
      }
    } catch (e) {
      toast.error(e);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Form className='mt-4 mx-3' onSubmit={handleSubmit(updateImage)}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" {...register('image')} />
        </Form.Group>
        <Button variant="danger" type="submit" className='mb-3'>{isLodding ? <Loading /> : 'Update'}</Button>
      </Form>
    </>

  )
}
