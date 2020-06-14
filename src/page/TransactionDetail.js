import React, {Component} from 'react'
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
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import logo from '../assets/smeatech.png'
import profile from '../assets/profile.png'
import card from '../assets/dilan-card.png'

class TransactionDetail extends Component {
  constructor(props){
    super(props)
    this.checkToken = () => {
      if(!localStorage.getItem('token')){
				props.history.push('/admin')
				swal.fire({
					icon: 'error',
					title: 'Nooooo!',
					text: 'You have to login first'
				})
      }
    }
    this.state = {
      showAddModal: false,
      showPenaltyModal: false,
      showLogoutModal: false,
      showNavbar: false,
      showSuccessModal: false,
      pageInfo: {},
      search: '',
      id: props.match.params.id,
      title: props.location.state.title,
      user: props.location.state.user,
      employee: props.location.state.employee,
      status: props.location.state.status,
      created_at: props.location.state.created_at,
      data: []
    }
    this.updateTransaction = this.updateTransaction.bind(this)
    this.addHistory = this.addHistory.bind(this)
		this.toggleNavbar = this.toggleNavbar.bind(this)
    this.deleteTransaction = this.deleteTransaction.bind(this)
		this.toggleLogoutModal = this.toggleLogoutModal.bind(this)
		this.logoutAuth = this.logoutAuth.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    this.togglePenaltyModal = this.togglePenaltyModal.bind(this)
  }
  home = (e) =>{
    e.preventDefault()
    
    this.props.history.push('/administrators')
  }
  toggleNavbar(){
		this.setState({
			showNavbar: !this.state.showNavbar
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
  handlerChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }
  async addHistory (event) {
		const {REACT_APP_URL} = process.env
		const dataSubmit = {
      transaction_id: this.state.id,
      title: this.state.title,
      user: this.state.user,
      employee: this.state.employee,
      date: this.state.created_at
    }
		const url = `${REACT_APP_URL}histories`
		await axios.post(url, dataSubmit).then( (response) => {
				console.log(response);
			})
			.catch(function (error) {
				swal.fire({
					icon: 'error',
					title: 'Oops!',
					text: "Something's wrong, I can feel it"
				})
				console.log(error);
			 })
		this.props.history.push(`/transactions`)
	}
  deleteTransaction(){
    const {REACT_APP_URL} = process.env
    console.log(this.state.id)
    axios.delete(`${REACT_APP_URL}transactions/${this.state.id}`)
    this.setState({showDeleteModal: !this.state.showDeleteModal})
    this.addHistory()
    this.props.history.push('/transactions')
    swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Okay! Book returned'
    })
  }
  updateTransaction(){
    const {REACT_APP_URL} = process.env
    console.log(this.state.id)
    axios.patch(`${REACT_APP_URL}transactions/${this.state.id}`)
    this.setState({showDeleteModal: !this.state.showDeleteModal})
    this.props.history.push('/transactions')
    swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Okay! Penalty setted'
    })
  }
  toggleDeleteModal(){
    this.setState({
      showDeleteModal: !this.state.showDeleteModal
    })
  }
  togglePenaltyModal(){
    this.setState({
      showPenaltyModal: !this.state.showPenaltyModal
    })
  }
  async componentDidMount(){
		this.checkToken()
  }

  render(){
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
                </Nav>
                  <span className="navbar-text">
                    <Form className="form-inline">
                      <Button onClick={this.toggleLogoutModal} className="btn-danger form-control mr-sm-2" type='button'>Logout</Button>
                    </Form>
                  </span>
                </Collapse>
              </Navbar>
          </Col>
          <Col className='mt-5'>
            <div className='d-flex justify-content-between container'>
              <div className='mt-5'>
                <h4><Link to='/administrators'><a className='text-dark mb-5'>Transactions</a></Link> &gt; Detail</h4>
              </div>
            </div>
          </Col>
          <Col className='mt-1'>
            <div className='container'>
              <Table bordered className='mt-5'>
                <tr>
                  <td><h6>Title</h6></td>
                  <td>{this.state.title}</td>
                </tr>
                <tr>
                  <td><h6>User</h6></td>
                  <td>{this.state.user}</td>
                </tr>
                <tr>
                  <td><h6>Employee</h6></td>
                  <td>{this.state.employee}</td>
                </tr>
                <tr>
                  <td><h6>Status</h6></td>
                  <td>{this.state.status}</td>
                </tr>
                <tr>
                  <td><h6>Date</h6></td>
                  <td>{this.state.created_at}</td>
                </tr>
              </Table>
              <div className='mt-4'>
                <Button className='btn-danger' onClick={this.togglePenaltyModal}>Set Penalty</Button>
                <Button className='btn-success ml-3' onClick={this.toggleDeleteModal}>Return This Book</Button>
              </div>
            </div>
          </Col>
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
          <Form onSubmit={this.handlerUpdate}>
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
        
         {/* Edit Modal */}
         <Modal isOpen={this.state.showEditModal}>
          <ModalHeader className='h1'>Edit Admin</ModalHeader>
          <ModalBody>
            <h6>Name</h6>
            <Input name='name' type='text' className='mb-2' onChange={this.handlerChange} value={this.state.name}/>
            <h6>Email</h6>
            <Input name='email' type='text' className='mb-2' onChange={this.handlerChange} value={this.state.email}/>
            <h6>Password</h6>
            <Input name='password' type='password' className='mb-2' onChange={this.handlerChange} value={this.state.password}/>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.handlerUpdate}>Edit</Button>
            <Button color='secondary' onClick={this.toggleEditModal}>Cancel</Button>
          </ModalFooter>
        </Modal>

         {/* Delete Modal */}
         <Modal isOpen={this.state.showDeleteModal}>
            <ModalBody className='h4'>Are you sure?</ModalBody>
            <ModalFooter>
              <Button color='success' onClick={this.deleteTransaction}>Return</Button>
              <Button color='secondary' onClick={this.toggleDeleteModal}>Cancel</Button>
            </ModalFooter>
          </Modal>

          {/* Penalty Modal */}
         <Modal isOpen={this.state.showPenaltyModal}>
            <ModalBody className='h4'>Are you sure?</ModalBody>
            <ModalFooter>
              <Button color='danger' onClick={this.updateTransaction}>Penalty</Button>
              <Button color='secondary' onClick={this.togglePenaltyModal}>Cancel</Button>
            </ModalFooter>
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

export default TransactionDetail