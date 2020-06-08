import React, {Component} from 'react'
import Logo from '../assets/smeatech.png'
import {Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  login = (e) => {
    e.preventDefault()
    const data = {
      userData: {
        email: this.state.email,
        password: this.state.password,
      }
    }
    this.props.history.push('/tes', data)
  }

  render(){
    return(
      <>
        <Row className='h-100 no-gutters'>
          <Col md={7} className='login-cover'>
            <div className='d-flex flex-column justify-content-between login-overlay w-100 h-100'>
              <h1 className='text-white'>Book is a window <br/>to the world.</h1>
            </div>
          </Col>
          <Col md={5}>
            <div className='d-flex flex-column w-100 h-100 pl-3'>
              <div className='d-flex justify-content-end'>
                <img className='p-3' src={Logo} alt='Logo' />
              </div>
              <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
                <Form className='login-form mb-5'>
                  <h1>Sign Up</h1>
                  <p>Hi! Lets join us :)</p>
                  <div className='input-wrapper no-gutter'>
                    <FormGroup className='form-group'>
                      <Label className='w-100'>
                        <Input type='text' placeholder='Username'/>
                      </Label>
                    </FormGroup>
                    <FormGroup className='form-group'>
                      <Label className='w-100'>
                        <Input type='text' placeholder='Full Name'/>
                      </Label>
                    </FormGroup>
                    <FormGroup className='form-group'>
                      <Label className='w-100'>
                        <Input type='email' placeholder='Email Adress'/>
                      </Label>
                    </FormGroup>
                    <FormGroup className='form-group'>
                      <Label className='w-100'>
                        <Input type='password' placeholder='Password'/>
                      </Label>
                    </FormGroup>
                    </div>
                  <div className='d-flex flex-row justify-content-between mt-4'>
                    <FormGroup check>
                      <Label check>
                        <Input type='checkbox' />
                        <span>Remember Me</span>
                      </Label>
                    </FormGroup>
                  </div>
                  <div className='mt-4'>
                    <Link className='btn right-btn' to='/dashboard'>Signup</Link>
                    <Link className='btn left-btn ml-2' to='/'>Login</Link>
                  </div>
                  <div className='d-flex flex-column mt-5'>
                    <div>By signing up, you agree to Liferary’s</div>
                    <div> <a href='#'>Terms and Conditions</a> &amp; <a href='#'>Privacy Policy</a></div>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

export default Login