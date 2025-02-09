import React, { useContext } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';

import style from './style.module.css';
import { UserContext } from '../context/UserContext';
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiTakeawayLine } from "react-icons/ri";
import { CiCamera } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

export default function CustomSideBar() {
  const {user,setUser,logout} = useContext(UserContext);
  
  return (
    <Sidebar className={style.sidebar_style} backgroundColor='#22303c'>
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
        <MenuItem icon={<RiTakeawayLine size={100} />} component={<Link to="/profile/order" />}> Order</MenuItem>
        <MenuItem icon={<CiCamera size={50}/>} component={<Link to="/profile/image" />}> Image</MenuItem>
        <MenuItem onClick={logout} icon={<IoIosLogOut size={50}/>} > Logout</MenuItem>

      </Menu>
    </Sidebar>
  )
}
