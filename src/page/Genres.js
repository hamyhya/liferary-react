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
import {connect} from 'react-redux'

import {getGenre, postGenre} from '../redux/actions/genre'

class Genres extends Component {
  constructor(props){
    super(props)
    this.state = {
      showNavbar: false,
      showAddModal: false,
      showLogoutModal: false,
      pageInfo: {},
      search: '',
      name: '',
      email: '',
      password: '',
      data: []
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
  toggleAddModal(){
		this.setState({
			showAddModal: !this.state.showAddModal
		})
  }
  logoutAuth = () => {
		this.setState({isLoading: true},()=>{
				this.setState({isLoading: false}, ()=>{
					localStorage.removeItem('token')
						this.props.history.push('/')
				})
		})
  }
  toggleLogoutModal(){
		this.setState({
			showLogoutModal: !this.state.showLogoutModal
		})
	}
  handlerSubmit = (event) => {
    event.preventDefault()
    this.setState({isLoading: true})
    const dataSubmit = {
        name: this.state.name,
    }
    
    this.props.postGenre(dataSubmit).then( (response) => {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error.response)
        swal.fire({
					icon: 'error',
					title: 'Oops!',
					text: "Something's wrong, I can feel it"
				})
       }) 
       swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Yay! add genre success'
      })
       this.props.history.push('/dashboard')
  }
  toggleDeleteModal(){
    this.setState({
      showDeleteModal: !this.state.showDeleteModal
    })
  }
  fetchData = (params) => {
    const param = `${qs.stringify(params)}`
		this.props.getGenre(param).then( (response) => {

			const pageInfo = this.props.genre.pageInfo
	
			this.setState({pageInfo})
			if(param){
					this.props.history.push(`?${param}`)
			}
		})
  }
  authCheck = () => {
    if((this.props.login.token === null)){
			this.props.history.push('/admin')
			swal.fire({
				icon: 'error',
				title: 'Oopss!',
				text: "You've to login first"
			})
    }
  }
  componentDidMount(){
		this.authCheck()
    const param = qs.parse(this.props.location.search.slice(1))
    this.fetchData(param)
  }

  render(){
    const {dataGenre, isLoading} = this.props.genre

    const params = qs.parse(this.props.location.search.slice(1))
    params.page = params.page || 1
    params.search = ''
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
                    <h4>List Genres</h4>
                  </div>
                  <div className='mt-5'>
                    <Button className='btn btn-add-admin' onClick={this.toggleAddModal}>Add Genres</Button>
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
                        <th>Genre ID</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataGenre.map((genre, index) => (
                      <tr>
                        <th scope="row">{genre.id}</th>
                        <td>{genre.name}</td>
                        <td>
                          <h6><Link to={{
                              pathname: `/genres-detail/${genre.id}`,
                              state: {
                                id: `${genre.id}`,
                                name: `${genre.name}`
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
          <ModalHeader className='h1'>Add Genre</ModalHeader>
          <ModalBody>
            <h6>Name</h6>
            <Input name='name' onChange={this.handlerChange} type='text' className='mb-2'/>
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
  genre: state.genre,
  login: state.login
})

const mapDispatchToProps = {getGenre, postGenre}

export default connect(mapStateToProps, mapDispatchToProps)(Genres)