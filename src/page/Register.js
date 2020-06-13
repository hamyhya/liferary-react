import React, {Component} from 'react'
import Logo from '../assets/smeatech.png'
import swal from 'sweetalert2'
import axios from 'axios'
import {Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this.registerUser = this.registerUser.bind(this)
  }
  handlerChange = (e) =>{
		this.setState({[e.target.name]: e.target.value})
	}
  async registerUser (event) {
		event.preventDefault()
		const {REACT_APP_URL} = process.env
		const dataSubmit = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }

		const url = `${REACT_APP_URL}users`
		await axios.post(url, dataSubmit).then( (response) => {
				console.log(response);
				this.setState({showAddModal: false})
				swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Register successfully'
				})
			})
			.catch(function (error) {
				swal.fire({
					icon: 'error',
					title: 'Hmmm!',
					text: "Something's wrong, I can feel it"
				})
				console.log(error);
			 })
		this.props.history.push(`/login`)
	}
  async componentDidMount(){

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
                <Form className='login-form mb-5' onSubmit={this.registerUser}>
                  <h1>Sign Up</h1>
                  <p>Hi! Lets join us :)</p>
                  <div className='input-wrapper no-gutter'>
                    <FormGroup className='form-group'>
                      <Label className='w-100'>
                        <Input type='text' name='name' onChange={this.handlerChange} placeholder='Full Name'/>
                      </Label>
                    </FormGroup>
                    <FormGroup className='form-group'>
                      <Label className='w-100'>
                        <Input type='email' name='email' onChange={this.handlerChange} placeholder='Email Adress'/>
                      </Label>
                    </FormGroup>
                    <FormGroup className='form-group'>
                      <Label className='w-100'>
                        <Input type='password' name='password' onChange={this.handlerChange} placeholder='Password'/>
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
                    <Button type='submit' className='btn right-btn'>Register</Button>
                    <Link className='btn left-btn ml-2' to='/login'>Login</Link>
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