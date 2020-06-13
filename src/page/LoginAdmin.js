import React, {Component} from 'react'
import Logo from '../assets/smeatech.png'
import swal from 'sweetalert2'
import axios from 'axios'
import {Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

class LoginAdmin extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.LoginAdmin = this.LoginAdmin.bind(this)
    // this.checkLogin = this.checkLogin.bind(this)
  }

  handlerChange = (e) =>{
		this.setState({[e.target.name]: e.target.value})
	}
  async LoginAdmin (event) {
		event.preventDefault()
		const {REACT_APP_URL} = process.env
		const dataSubmit = {
      email: this.state.email,
      password: this.state.password
    }

		const url = `${REACT_APP_URL}employes/login`
		await axios.post(url, dataSubmit).then( (response) => {
				console.log(response);
          this.setState( () => {
            localStorage.setItem('token', 'true')
            this.props.history.push('/dashboard')
          })
        swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Login successfully'
				})
			})
			.catch(function (error) {
				swal.fire({
					icon: 'error',
					title: 'Hmmm!',
					text: "Data doesn't match our records"
				})
				console.log(error);
			 })
  }
  // checkLogin = () => {
  //   if (localStorage.getItem('token')) {
  //     this.props.history.push('/dashboard')
  //   }
  // }
  // async componentDidMount(){
  //   await this.checkLogin()
	// }

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
                <Form className='login-form mb-5' onSubmit={this.LoginAdmin}>
                  <h1>Login Admin</h1>
                  <p>Enjoy your work today! :)</p>
                  <div className='input-wrapper no-gutter'>
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
                    <div><a href='#'><Link to='/login'>User</Link></a></div>
                  </div>
                  <div className='mt-4'>
                    <Button type='submit' className='btn right-btn' to='/dashboard'>Login</Button>
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

export default LoginAdmin