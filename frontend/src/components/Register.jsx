import React, { useState, useRef } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        organization: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const organizationRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleKeyPress = (e, nextRef) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextRef && nextRef.current) {
                nextRef.current.focus();
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
      <Container className="auth-container" style={{fontFamily: 'Vazir !imortant', fontWeight: 'bold'}}>
        <h1 className="text-center" >ایجاد حساب</h1>
        <Form onSubmit={handleSubmit} className="auth-form">
          <Row>
            <Col sx={6}>

              <Form.Group className="mb-3 input-container" controlId="formFirstName">
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onKeyPress={(e) => handleKeyPress(e, lastNameRef)}
                  ref={firstNameRef}
                  required
                  placeholder=""
                  className={formData.firstName ? 'filled' : ''}
                />
                <Form.Label>نام</Form.Label>
              </Form.Group>
            </Col>
            
            <Col sx={6}>
              <Form.Group className="mb-3 input-container" controlId="formLastName">
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onKeyPress={(e) => handleKeyPress(e, organizationRef)}
                  ref={lastNameRef}
                  required
                  placeholder=""
                  className={formData.lastName ? 'filled' : ''}
                />
                <Form.Label>نام خانوادگی</Form.Label>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3 input-container" controlId="formOrganization">
            <Form.Control
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              onKeyPress={(e) => handleKeyPress(e, emailRef)}
              ref={organizationRef}
              required
              placeholder=""
              className={formData.organization ? 'filled' : ''}
            />
            <Form.Label>موسسه یا انجمن</Form.Label>
          </Form.Group>



          <Form.Group className="mb-3 input-container" controlId="formEmail">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={(e) => handleKeyPress(e, passwordRef)}
              ref={emailRef}
              required
                        placeholder=""
                        className={formData.email ? 'filled' : ''}
                    />
                    <Form.Label>ایمیل</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3 input-container" controlId="formPassword">
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onKeyPress={(e) => handleKeyPress(e, confirmPasswordRef)}
                        ref={passwordRef}
                        required
                        placeholder=""
                        className={formData.password ? 'filled' : ''}
                    />
                    <Form.Label>رمز ورود</Form.Label>
                </Form.Group>
                
                <Form.Group className="mb-3 input-container" controlId="formConfirmPassword">
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onKeyPress={(e) => handleKeyPress(e, null)}
                        ref={confirmPasswordRef}
                        required
                        placeholder=""
                        className={formData.confirmPassword ? 'filled' : ''}
                    />
                    <Form.Label>تایید رمز</Form.Label>
                </Form.Group>
                <Button type="submit" className="w-100 mb-5" variant="primary" >ایجاد حساب</Button>
                <Button type="submit" className="w-100 mb-3" variant="outline-primary">
                  
                  <svg className="icon" viewBox="0 0 24 24" style={{widows:'1.7rem', height:'1.7rem'}}>
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                    <path d="M1 1h22v22H1z" fill="none"> </path>
                  </svg>
                   با حساب گوگل وارد شوید  
                
                </Button>
                <p className="text-center">از قبل حساب داشتید؟<Link to="/auth/login"> ورود به حساب</Link></p>
            </Form>
        </Container>
    );
}

export default Register;