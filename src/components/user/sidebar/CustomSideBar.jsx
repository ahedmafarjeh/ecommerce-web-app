import React, { useContext, useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';

import style from './style.module.css';
import { UserContext } from '../context/UserContext';
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiTakeawayLine } from "react-icons/ri";
import { CiCamera } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import MainImage from './MainImage';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function CustomSideBar() {
  const { logout } = useContext(UserContext);
  const [collapse, setCollapse] = useState(false);


  return (
  
    <>
    {/* <div className='w-100 border-end border-light pb-3 ps-2 ' style={{backgroundColor:"#22303c"}}>
          <FaBars  style={{cursor:'pointer'}} className='text-white ' onClick={() => setCollapse(!collapse)} size={20} />

    </div> */}
      
      <Sidebar  transitionDuration={600} collapsed={collapse}  className={`${style.sidebar_style}`}  backgroundColor='#22303c'  >
      <div className='d-flex justify-content-between mx-3 mb-3'>
        {collapse?
      <FaBars  style={{cursor:'pointer'}} onClick={() => setCollapse(false)} size={20} />
      :< FaTimes style={{cursor:'pointer'}} onClick={() => setCollapse(true)} size={20} className='ms-auto'  />
        }
      </div>
      <MainImage />
      <Menu 
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: '#13395e',
              color: '#b6c8d9',
            },
            "&:hover": {
              backgroundColor: "#335B8C ", // rgba(255, 255, 255, 0.4)
              color: "white",
              borderRadius: "5px",
              fontWeight: "bold !important"
            },
          },

        }}
      >
        <MenuItem icon={<IoPersonCircleOutline size={100} />} className='sidebar_link' component={<Link to="/profile/info" />}> Info</MenuItem>
        <MenuItem icon={<RiTakeawayLine size={100} />} component={<Link to="/profile/order" />}> Orders</MenuItem>
        <MenuItem icon={<CiCamera size={50} />} component={<Link to="/profile/image" />}> Image</MenuItem>
        <MenuItem onClick={logout} icon={<IoIosLogOut size={50} />} > Logout</MenuItem>
      
      </Menu>
    </Sidebar>

    </>
  )
}
