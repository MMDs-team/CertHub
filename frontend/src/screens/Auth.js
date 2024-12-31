import React from 'react'
import {  Routes, Route } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap'
import Login from '../components/Login'
import bloone from '../static/images/bloone.svg'
import Redirect from '../components/Redirect';
import Register from '../components/Register';

import '../static/styles/auth.css';



const Auth = () => {
  return (
    <Container className='p-4' style={{minHeight : 'inherit', display:'flex', flexDirection: 'column', justifyContent:'center'}}>
      <Row className='p-1 p-md-3 p-lg-5 border bg-secondary'>
        <Col md={12} lg={6} className='bg-light'>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Redirect />} />
        </Routes>
        </Col>
        <Col xs={0} md={0} lg={6} className='bg-secondary d-none d-lg-flex align-items-center'>
          <img
            src={bloone}
            alt="Login illustration"
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Auth