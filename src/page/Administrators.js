import React, {Component, useState} from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import qs from 'querystring'
import {Row, 
  Col, 
  Nav, 
  Form, 
  Button,
  Modal, 
  ModalBody, 
  ModalHeader, 
  Input, 
  Table, 
  ModalFooter, 
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  NavLink} from 'reactstrap'
import {Dropdown} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import jwt from 'jsonwebtoken'
import {connect} from 'react-redux'

import {getAdmin, postAdmin} from '../redux/actions/admin'
import {logoutAuth, registerAdmin} from '../redux/actions/login'

class Administrators extends Component {
  constructor(props){
    super(props)
    this.state = {
      showAddModal: false,
      showNavbar: false,
      showLogoutModal: false,
      pageInfo: {},
      search: '',
      name: '',
      email: '',
      password: '',
      data: [],
      token: jwt.decode(this.props.login.token)
    }
    this.handlerSubmit = this.handlerSubmit.bind(this)
    this.toggleAddModal = this.toggleAddModal.bind(this)
		this.toggleNavbar = this.toggleNavbar.bind(this)
		this.toggleLogoutModal = this.toggleLogoutModal.bind(this)
		this.logoutAuth = this.logoutAuth.bind(this)
  }
  handlerChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }
  toggleNavbar(){
		this.setState({
			showNavbar: !this.state.showNavbar
		})
  }
  logoutAuth = () => {
		this.props.logoutAuth()
		this.props.history.push('/')
  }
  toggleLogoutModal(){
		this.setState({
			showLogoutModal: !this.state.showLogoutModal
		})
	}
  handlerSubmit = (event) => {
		event.preventDefault()
		const dataSubmit = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    const token = this.props.login.token

    this.props.registerAdmin(dataSubmit, token).then((response) => {
      this.props.history.push('/dashboard')
      swal.fire({
  			icon: 'success',
  			title: 'Success',
  			text: 'Register admin successfully'
      })
    }).catch(function (error) {
      swal.fire({
        icon: 'error',
        title: 'Hmmm!',
        text: "Data already exist"
      })
    })
	}
  toggleAddModal(){
    this.setState({
      showAddModal: !this.state.showAddModal
    })
  }
  toggleEditModal(){
    this.setState({
      showEditModal: !this.state.showEditModal
    })
  }
  toggleDeleteModal(){
    this.setState({
      showDeleteModal: !this.state.showDeleteModal
    })
  }
  fetchData = async (params) => {
    const param = `${qs.stringify(params)}`
		this.props.getAdmin(param).then( (response) => {

			const pageInfo = this.props.admin.pageInfo
	
			this.setState({pageInfo})
			if(param){
					this.props.history.push(`?${param}`)
			}
		})
  }
	checkLogin = () => {
		
    if((this.props.login.token === null)){
			this.props.history.goBack()
			swal.fire({
				icon: 'error',
				title: 'Oopss!',
				text: "You've to login as admin first"
			})
    } else if (this.state.token.role !== 'admin') {
			this.props.history.goBack()
			swal.fire({
				icon: 'error',
				title: 'Oopss!',
				text: "You've to login as admin first"
			})
		}
  }
  componentDidMount(){
		this.checkLogin()
    const param = qs.parse(this.props.location.search.slice(1))
    this.fetchData(param)
  }

  render(){
    const {dataAdmin, isLoading} = this.props.admin

    const params = qs.parse(this.props.location.search.slice(1))
    params.page = params.page || 1
    params.search = params.search || ''
    params.sort = params.sort || 0
    return(
      <>
        <Row className='d-flex flex-column w-100'>
          <Col className='w-100'>
            <Navbar className='nav-dashboard fixed-top' light expand="md">
						  <Link to='/dashboard'><NavbarBrand className='text-white'>Liferary</NavbarBrand></Link>
              <NavbarToggler onClick={this.toggleNavbar} />
              <Collapse isOpen={this.state.showNavbar} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <Link to='/transactions'><NavLink className='text-white'>Transactions</NavLink></Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/histories'><NavLink className='text-white'>Histories</NavLink></Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/administrators'><NavLink className='text-white'>Administrators</NavLink></Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/users'><NavLink className='text-white'>Users</NavLink></Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/genres'><NavLink className='text-white'>Genres</NavLink></Link>
                  </NavItem>
                </Nav>
                  <span className="navbar-text">
                    <Form className="form-inline">
                      <Input onChange={e => this.setState({search: e.target.value})} className="form-control mr-sm-2" type="search" placeholder="Search ..." aria-label="Search" />
                      <Button onClick={()=>this.fetchData({...params, search: this.state.search})} className="btn-search form-control mr-sm-2" type='button'>Search</Button>
                      <Button onClick={this.toggleLogoutModal} className="btn-danger form-control mr-sm-2" type='button'>Logout</Button>
                    </Form>
                  </span>
                </Collapse>
              </Navbar>
          </Col>
          {isLoading ? (
            <center className='mt-5'>
              <div class="d-flex align-items-center spinner-border text-dark mt-5" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </center>
          ):(
            <div>
              <Col className='mt-5'>
                <div className='d-flex justify-content-between container'>
                  <div className='mt-5'>
                    <h4>List Administrators</h4>
                  </div>
                  <div className='mt-5'>
                    <Button className='btn btn-add-admin' onClick={this.toggleAddModal}>Add Admin</Button>
                  </div>
                </div>
              </Col>
              <Col className='mt-5'>
                <div className='container'>
                  <Dropdown className="mb-4 ml-2">
                    <Dropdown.Toggle className='btn-sort' id="dropdown-basic">
                      Sort By
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => this.fetchData({ ...params, sort: 0 })}>Ascending</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.fetchData({ ...params, sort: 1 })}>Descending</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
              <Col className='mt-1'>
                <div className='container'>
                  <Table bordered className='mt-2'>
                    <thead>
                      <tr>
                        <th>Admin ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataAdmin.map((admin, index) => (
                      <tr>
                        <th scope="row">{admin.id}</th>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>
                          <h6><Link to={{
                              pathname: `/administrators-detail/${admin.id}`,
                              state: {
                                id: `${admin.id}`,
                                name: `${admin.name}`,
                                email: `${admin.email}`,
                                password: `${admin.password}`
                              }
                            }}><a>More... </a></Link></h6> 
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col className='mt-5'>
                <div className='mb-5 pagination-btn d-flex flex-row justify-content-between container'>
                  <div>
                    {<Button onClick={()=>this.fetchData({...params, page: parseInt(params.page)-1})}>Prev</Button>}
                    
                  </div>
                  <div>
                    {[...Array(this.state.pageInfo.totalPage)].map((o, i)=>{
                      return (
                      <Button onClick={()=>this.fetchData({...params, page: params.page? i+1 : i+1})} className='mr-1 ml-1' key={i.toString()}>{i+1}</Button>
                      )
                    })}
                  </div>
                  <div>
                    <Button onClick={()=>this.fetchData({...params, page: parseInt(params.page)+1})}>Next</Button>
                  </div>
                </div>
              </Col>
            </div>
          )}
        </Row>
        <Row className='w-100 '>
          <Col className='mt-5 w-100'>
            <div className='fixed-bottom footer d-flex justify-content-center align-items-center'>
              <h6 className='text-white'>Crafted with love by <a className='text-white' href='https://instagram.com/ilhambagasaputra'>Ilham Bagas Saputra</a></h6>
            </div>
          </Col>
        </Row>

        {/* Add Modal */}
        <Modal isOpen={this.state.showAddModal}>
          <Form onSubmit={this.handlerSubmit}>
          <ModalHeader className='h1'>Add Admin</ModalHeader>
          <ModalBody>
            <h6>Name</h6>
            <Input name='name' onChange={this.handlerChange} type='text' className='mb-2'/>
            <h6>Email</h6>
            <Input name='email' onChange={this.handlerChange} type='text' className='mb-2'/>
            <h6>Password</h6>
            <Input name='password' onChange={this.handlerChange} type='password' className='mb-2'/>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' type='submit'>Add</Button>
            <Button color='secondary' onClick={this.toggleAddModal}>Cancel</Button>
          </ModalFooter>
          </Form>
        </Modal>

          {/* Logout Modal */}
				<Modal isOpen={this.state.showLogoutModal}>
          <ModalBody className='h4'>Are you sure?</ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={this.logoutAuth}>Logout</Button>
            <Button color='secondary' onClick={this.toggleLogoutModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = state => ({
  admin: state.admin,
  login: state.login
})

const mapDispatchToProps = {getAdmin, postAdmin, logoutAuth, registerAdmin}

export default connect(mapStateToProps, mapDispatchToProps)(Administrators)