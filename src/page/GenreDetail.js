import React, {Component} from 'react'
import swal from 'sweetalert2'
import qs from 'querystring'
import {Row, Col, Form, Button, Modal, ModalBody, 
  ModalHeader, ModalFooter, Nav, Input, Table, Collapse,
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

import {patchGenre, deleteGenre} from '../redux/actions/genre'
import {logoutAuth} from '../redux/actions/login'

class GenreDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      showAddModal: false,
      showSuccessModal: false,
      showLogoutModal: false,
			showNavbar: false,
      pageInfo: {},
      search: '',
      id: props.match.params.id,
      name: props.location.state.name,
      email: props.location.state.email,
      password: props.location.state.password,
      data: [],
      token: jwt.decode(this.props.login.token)
    }
    this.handlerUpdate = this.handlerUpdate.bind(this)
    this.deleteGenre = this.deleteGenre.bind(this)
		this.toggleNavbar = this.toggleNavbar.bind(this)
		this.toggleLogoutModal = this.toggleLogoutModal.bind(this)
		this.logoutAuth = this.logoutAuth.bind(this)
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
  }
  home = (e) =>{
    e.preventDefault()
    
    this.props.history.push('/administrators')
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
  handlerUpdate = (event) => {
    event.preventDefault()
    const dataSubmit = {
        name: this.state.name
    }
    
    const {id} = this.state
    const token = this.props.login.token

    this.props.patchGenre(id, dataSubmit, token).then( (response) => {
        swal.fire({
         icon: 'success',
         title: 'Success',
         text: 'Yahaha! edit genre success'
       })
       this.props.history.push('/genres')
      })
      .catch(function (error) {
        console.log(error.response)
        swal.fire({
					icon: 'error',
					title: 'Oops!',
					text: "Something's wrong, I can feel it"
				})
       }) 
}
deleteGenre(){
  const {id} = this.state
  const token = this.props.login.token

  this.props.deleteGenre(id, token).then((response) => {
    swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Poof! delete genre success'
    })
    this.props.history.push('/genres')
  }).catch(function (error) {
    swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: "Something's wrong, I can feel it"
    })
    this.props.history.push('/genres')
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
                      <Button onClick={this.toggleLogoutModal} className="btn-danger form-control mr-sm-2" type='button'>Logout</Button>
                    </Form>
                  </span>
                </Collapse>
              </Navbar>
          </Col>
          <Col className='mt-5'>
            <div className='d-flex justify-content-between container'>
              <div className='mt-5'>
                <h4><Link to='/genres'><a className='text-dark mb-5'>Genres</a></Link> &gt; Detail</h4>
              </div>
            </div>
          </Col>
          <Col className='mt-1'>
            <div className='container'>
              <Table bordered className='mt-5'>
                  <tr>
                    <td><h6>Genre ID</h6></td>
                    <td>{this.state.id}</td>
                  </tr>
                  <tr>
                    <td><h6>Name</h6></td>
                    <td>{this.state.name}</td>
                  </tr>
              </Table>
              <div className='mt-4'>
                <Button className='btn-warning' onClick={this.toggleEditModal}>Edit</Button>
                <Button className='btn-danger ml-3' onClick={this.toggleDeleteModal}>Delete</Button>
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
        
         {/* Edit Modal */}
         <Modal isOpen={this.state.showEditModal}>
          <ModalHeader className='h1'>Edit Genre</ModalHeader>
          <ModalBody>
            <h6>Name</h6>
            <Input name='name' type='text' className='mb-2' onChange={this.handlerChange} value={this.state.name}/>
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
              <Button color='danger' onClick={this.deleteGenre}>Delete</Button>
              <Button color='secondary' onClick={this.toggleDeleteModal}>Cancel</Button>
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

const mapDispatchToProps = {patchGenre, deleteGenre, logoutAuth}

export default connect (mapStateToProps, mapDispatchToProps)(GenreDetail)