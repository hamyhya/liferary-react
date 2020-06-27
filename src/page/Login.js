import React, {Component} from 'react'
import Logo from '../assets/smeatech.png'
import swal from 'sweetalert2'
import axios from 'axios'
import qs from 'querystring'
import {Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap'
import {
  Link
} from "react-router-dom";
import {connect} from 'react-redux'

import {loginUser} from '../redux/actions/login'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.loginUser = this.loginUser.bind(this)
    this.checkLogin = this.checkLogin.bind(this)
  }

  handlerChange = (e) =>{
		this.setState({[e.target.name]: e.target.value})
	}
  async loginUser (event) {
		event.preventDefault()
		const {REACT_APP_URL} = process.env
		const dataSubmit = {
      email: this.state.email,
      password: this.state.password,
      role: 'user',
    }

		const url = `${REACT_APP_URL}users/login`
		await axios.post(url, qs.stringify(dataSubmit)).then( (response) => {
				console.log(response);
          // this.setState( () => {
          //   localStorage.setItem('token', 'true')
          //   this.props.history.push('/dashboard-user')
          // })
        swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Login successfully'
        })
        if (response.data.token) {
          const role = {
            roleName: 'user'
          }
          localStorage.setItem('token', JSON.stringify(response.data))
          localStorage.setItem('role', JSON.stringify(role))
          this.props.history.push('/dashboard-user')
        }
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
  checkLogin = () => {
    if (localStorage.getItem('token')) {
      this.props.history.push('/dashboard')
    }
  }
  async componentDidMount(){
    await this.checkLogin()
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
                <Form className='login-form mb-5' onSubmit={this.loginUser}>
                  <h1>Login</h1>
                  <p>Welcome Back, Please Login to your account! :)</p>
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
                    <div><a href=''><Link to='/admin'>Administrator</Link></a></div>
                  </div>
                  <div className='mt-4'>
                    <Button className='btn right-btn' type='submit'>Login</Button>
                    <Link className='btn left-btn ml-2' to='/register'>Sign Up</Link>
                  </div>
                  <div className='d-flex flex-column mt-5'>
                    <div>By signing up, you agree to Liferary’s</div>
                    <div> <a href='/tnc'>Terms and Conditions</a> &amp; <a href='/pp'>Privacy Policy</a></div>
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

const mapStateToProps = state => ({
  login: state.login
})

const mapDispatchToProps = {loginUser}

export default connect(mapStateToProps, mapDispatchToProps)(Login)