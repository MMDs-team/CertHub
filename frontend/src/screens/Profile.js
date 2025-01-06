import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';

const Profile = () => {

  const user = useContext(UserContext);

  return (
    <>
    
    <Container className="mt-5" style={{fontFamily: 'Vazir'}}>
      <Row>
        <Col md={6} className='g-5'>
          <Row className="justify-content-md-center">
            <Col>
              <Card style={{backgroundColor: '#f0f2ff'}}>
                <Card.Header as="h5"  className='bg-dark text-white'>پروفایل</Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4} className="text-center ">
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="img-fluid rounded-circle mb-3"
                      />
                    </Col>
                    <Col>
                      
                      <h3>{user.firstname} {user.lastname}</h3>
                      <p><strong></strong> {user.email}</p>
                      <p><strong></strong> {user.organization}</p>
                    </Col>
                  </Row>
                    <Button variant='primary' style={{float: 'left'}}>ویرایش</Button>
                    <Button variant='outline-danger' className='ms-3' style={{float: 'left'}}>خروج از حساب</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        
        </Col>


        <Col md={6} className='g-5'>
          <Row className="justify-content-md-center">
            <Col>
              <Card style={{backgroundColor: '#f0f2ff'}}>
                <Card.Header as="h5"  className='bg-dark text-white'>نمیدونم چی</Card.Header>
                <Card.Body>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        
        </Col>

    
        
      </Row>

      <Row>
        <Col>
        <Row className="justify-content-md-center">
            <Col className='g-5'>
              <Card style={{backgroundColor: '#f0f2ff'}}>
                <Card.Header as="h5"  className='bg-dark text-white'>قالب های من</Card.Header>
                <Card.Body>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
        </Col>
      </Row>

    </Container>
    </>

  );
};

export default Profile;