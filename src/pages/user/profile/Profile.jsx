import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomSideBar from '../../../components/user/sidebar/CustomSideBar'
import { Col, Container, Row } from 'react-bootstrap'

export default function Profile() {
  return (
    <>
      <Container fluid className='p-0 overflow-hidden'>
        <Row  className='position-relative'>
          <Col xs={12} lg="auto" >
            <CustomSideBar />
          </Col>
          <Col xl={9} >
            <Outlet />
          </Col>

        </Row>
      </Container>

    </>
  )
}
