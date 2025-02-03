import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomSideBar from '../../../components/user/sidebar/CustomSideBar'
import { Col, Container, Row } from 'react-bootstrap'

export default function Profile() {
  return (
    <>
      <Container fluid className='p-0'>
        <Row  >
          <Col md={2}>
            <CustomSideBar />
          </Col>
          <Col md={8}>
            <Outlet />
          </Col>

        </Row>
      </Container>

    </>
  )
}
