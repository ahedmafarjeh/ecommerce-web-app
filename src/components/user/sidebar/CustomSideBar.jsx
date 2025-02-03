import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

import style from './style.module.css';
export default function CustomSideBar() {
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
        <MenuItem icon="✏️" className='sidebar_link' component={<Link to="/profile/info" />}> Info</MenuItem>
        <MenuItem component={<Link to="/profile/order" />}> Order</MenuItem>
      </Menu>
    </Sidebar>
  )
}
