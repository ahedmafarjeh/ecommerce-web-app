import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { UserContext } from '../context/UserContext';
import userProfileImage from '../../../assets/imgs/userimg.jpg';
export default function MainImage() {
  const {user,loadingUser} = useContext(UserContext);
  return (
    <Container className='mb-2'>
      <div className='d-flex align-items-center gap-3 '>

        <img src={user?.hasOwnProperty('image')? user?.image.secure_url:userProfileImage} alt={user?.userName} style={{ width: '50px', height: '50px' }} className='rounded-circle border border-light border-3' />

        <p className='fs-5'>{user?.userName}</p>
      </div>
    </Container>
  )
}
