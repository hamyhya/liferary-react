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
import {Dropdown} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import jwt from 'jsonwebtoken'
import {connect} from 'react-redux'

import {getTransaction} from '../redux/actions/transaction'
import {logoutAuth} from '../redux/actions/login'


class Transactions extends Component {
  constructor(props){
    super(props)
    this.state = {
      showAddModal: false,
      showNavbar: false,
      showLogoutModal: false,
      pageInfo: {},
      search: '',
      data: [],
      token: jwt.decode(this.props.login.token)
    }
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
		this.toggleLogoutModal = this.toggleLogoutModal.bind(this)
		this.logoutAuth = this.logoutAuth.bind(this)
		this.toggleNavbar = this.toggleNavbar.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
  }
  toggleNavbar(){
		this.setState({
			showNavbar: !this.state.showNavbar
		})
  }
  toggleLogoutModal(){
		this.setState({
			showLogoutModal: !this.state.showLogoutModal
		})
	}
  logoutAuth = () => {
    this.props.logoutAuth()
    this.props.history.push('/')
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
  fetchData = (params) => {
    const param = `${qs.stringify(params)}`
		this.props.getTransaction(param).then( (response) => {

			const pageInfo = this.props.transaction.pageInfo
	
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
    const {dataTransaction, isLoading} = this.props.transaction

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
                    <h4>List Transactions</h4>
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
                        <th>Id</th>
                        <th>Book</th>
                        <th>User</th>
                        <th>Employee</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTransaction.map((transactions, index) => (
                      <tr>
                        <th scope="row">{transactions.id}</th>
                        <td>{transactions.title}</td>
                        <td>{transactions.user}</td>
                        <td>{transactions.employee}</td>
                        <td>{transactions.status}</td>
                        <td>{transactions.created_at}</td>
                        <td>
                        <h6>
                          <Link to={{
                              pathname: `/transactions-detail/${transactions.id}`,
                              state: {
                                id: `${transactions.id}`,
                                title: `${transactions.title}`,
                                user: `${transactions.user}`,
                                employee: `${transactions.employee}`,
                                status: `${transactions.status}`,
                                created_at: `${transactions.created_at}`
                              }
                            }}><a>More...</a></Link></h6>
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
          <ModalHeader className='h1'>Add Book</ModalHeader>
          <ModalBody>
            <h6>Title</h6>
            <Input type='text' className='mb-2'/>
            <h6>Description</h6>
            <Input type='text' className='mb-2'/>
            <h6>Image URL</h6>
            <Input type='text' className='mb-2'/>
            <h6>Author</h6>
            <Input type='text' className='mb-2'/>
            <h6>Genre</h6>
            <Input type='text' className='mb-2'/>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick=''>Add</Button>
            <Button color='secondary' onClick={this.toggleAddModal}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* Edit Modal */}
        <Modal isOpen={this.state.showEditModal}>
          <ModalHeader className='h1'>Edit Transaction</ModalHeader>
          <ModalBody>
            <h6>Status</h6>
            <Input type="select" name="select" id="exampleSelect">
              <option>Returned</option>
              <option>Pending</option>
              <option>Penalty</option>
            </Input>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick=''>Edit</Button>
            <Button color='secondary' onClick={this.toggleEditModal}>Cancel</Button>
          </ModalFooter>
        </Modal>

         {/* Delete Modal */}
         <Modal isOpen={this.state.showDeleteModal}>
            <ModalBody className='h4'>Are you sure?</ModalBody>
            <ModalFooter>
              <Button color='danger' onClick=''>Delete</Button>
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
  transaction: state.transaction,
  login: state.login
})

const mapDispatchToProps = {getTransaction, logoutAuth}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)