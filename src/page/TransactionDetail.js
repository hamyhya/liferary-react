import React, {Component} from 'react'
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
import jwt from 'jsonwebtoken'
import {connect} from 'react-redux'

import {deleteTransaction, penaltyTransaction, accTransaction} from '../redux/actions/transaction'
import {postHistory} from '../redux/actions/history'
import {logoutAuth} from '../redux/actions/login'

class TransactionDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      showAddModal: false,
      showPenaltyModal: false,
      showAccModal: false,
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
      data: [],
      token: jwt.decode(this.props.login.token)
    }
    this.setPenalty = this.setPenalty.bind(this)
    this.setAcc = this.setAcc.bind(this)
    this.addHistory = this.addHistory.bind(this)
		this.toggleNavbar = this.toggleNavbar.bind(this)
    this.deleteTransaction = this.deleteTransaction.bind(this)
		this.toggleLogoutModal = this.toggleLogoutModal.bind(this)
		this.logoutAuth = this.logoutAuth.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    this.togglePenaltyModal = this.togglePenaltyModal.bind(this)
    this.toggleAccModal = this.toggleAccModal.bind(this)
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
  handlerChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }
  addHistory (event) {
		const dataSubmit = {
      transaction_id: this.state.id,
      title: this.state.title,
      user: this.state.user,
      employee: this.state.employee,
      date: this.state.created_at
    }
    const token = this.props.login.token

		this.props.postHistory(dataSubmit, token).then( (response) => {
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
		this.props.history.push(`/dashboard`)
	}
  deleteTransaction(){
    const {id} = this.state
    const token = this.props.login.token
    this.props.deleteTransaction(id, token)
    this.setState({showDeleteModal: !this.state.showDeleteModal})
    this.addHistory()
    this.props.history.push('/dashboard')
    swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Okay! Book returned'
    })
  }
  setAcc(){
    const {id} = this.state
    const dataSubmit = {
      employee_id: this.state.token.id
    }
    const token = this.props.login.token
    this.props.accTransaction(id, dataSubmit, token)
    this.setState({showAccModal: !this.state.showAccModal})
    this.props.history.push('/dashboard')
    swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Okay! Transaction Accepted'
    })
  }
  setPenalty(){
    const {id} = this.state
    const token = this.props.login.token
    this.props.penaltyTransaction(id, token)
    this.setState({showPenaltyModal: !this.state.showPenaltyModal})
    this.props.history.push('/dashboard')
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
  toggleAccModal(){
    this.setState({
      showAccModal: !this.state.showAccModal
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
						  <Link to='/dashboard' className='navbar-brand text-white'>Liferary</Link>
              <NavbarToggler onClick={this.toggleNavbar} />
              <Collapse isOpen={this.state.showNavbar} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <Link to='/transactions' className='nav-link text-white'>Transactions</Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/histories' className='nav-link text-white'>Histories</Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/administrators' className='nav-link text-white'>Administrators</Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/users' className='nav-link text-white'>Users</Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/genres' className='nav-link text-white'>Genres</Link>
                  </NavItem>
                </Nav>
                  <span className="navbar-text">
                    <Form className="form-inline">
                      <Button onClick={this.toggleLogoutModal} className="btn-danger form-control mr-sm-2 mt-1" type='button'>Logout</Button>
                    </Form>
                  </span>
                </Collapse>
              </Navbar>
          </Col>
          <Col className='mt-5'>
            <div className='d-flex justify-content-between container'>
              <div className='mt-5'>
                <h4><Link to='/transactions' className='text-dark mb-5'>Transactions</Link> &gt; Detail</h4>
              </div>
            </div>
          </Col>
          <Col className='mt-1'>
            <div className='container'>
              <Table bordered className='mt-5'>
                <tbody>
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
                </tbody>
              </Table>
              <div className='mt-4'>
                <Button className='btn-success' onClick={this.toggleAccModal}>Accept</Button>
                <Button className='btn-danger ml-3' onClick={this.togglePenaltyModal}>Set Penalty</Button>
                <Button className='btn-primary ml-3' onClick={this.toggleDeleteModal}>Return</Button>
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
              <Button color='danger' onClick={this.setPenalty}>Penalty</Button>
              <Button color='secondary' onClick={this.togglePenaltyModal}>Cancel</Button>
            </ModalFooter>
          </Modal>

           {/* Acc Modal */}
         <Modal isOpen={this.state.showAccModal}>
            <ModalBody className='h4'>Are you sure?</ModalBody>
            <ModalFooter>
              <Button color='success' onClick={this.setAcc}>Accept</Button>
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

const mapStateToProps = state => ({
  login: state.login
})

const mapDispatchToProps = {
  deleteTransaction, 
  penaltyTransaction, 
  accTransaction,
  postHistory,
  logoutAuth
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail)