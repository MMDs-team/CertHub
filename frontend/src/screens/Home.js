import React from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap'

import docImage from '../static/images/doc_image.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div >
      
      <Row className='m-0' style={{ height: '3.5rem', backgroundColor: 'rgb(6, 57, 73)'}}></Row>
        
        <Row className='m-0' style={{backgroundColor: '#48d6d2'}}>
          <Col className='p-4' xs={12} md={8} lg={6}>
            <Image 
              fluid 
              src={docImage}
              
            />
          </Col>
          <Col xs={12} md={4} lg={6} className='p-1 p-md-2 p-lg-4 'style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <div className='p-0 p-md-2 p-lg-4 px-5 py-4 py-lg-1'>
                <p style={{
                  fontWeight: 'bolder',
                  color: 'white',
                  textAlign: 'justify',
                  fontFamily: 'Vazir',
                  fontSize: 'larger'
                }}>
                با استفاده از این وب‌سایت می‌توانید به‌راحتی برای دانشجویان و مشتریان خود گواهی‌نامه ایجاد کنید. این وب‌سایت شامل 
                <span className='text-primary'> قالب‌های متنوع آماده </span> است و همچنین امکان طراحی قالب‌های 
                <span className='text-primary'> اختصاصی </span> 
                   
                  را نیز فراهم می‌کند.
                </p>

                <Link to='/templates'>
                  <Button className='bg-primary px-4 py-2' style={{fontFamily: 'Vazir', float: 'left', fontWeight: 'bold'}}>ساخت گواهی</Button>
                </Link>
                <Link to='templates/use'>
                  <Button variant='outline-primary' className='px-4 ms-2 border-3' style={{fontFamily: 'Vazir', float: 'left', fontWeight: 'bold'}}>ساخت قالب</Button>
                </Link>
            </div>
            

          </Col>
        </Row>
        <Row>
            
        </Row>

    </div>
  )
}

export default Home