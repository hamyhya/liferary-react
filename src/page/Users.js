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
import {Dropdown} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

class Users extends Component {
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
      showLogoutModal: false,
      showNavbar: false,
      pageInfo: {},
      search: '',
      data: []
    }
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
		this.toggleNavbar = this.toggleNavbar.bind(this)
		this.toggleLogoutModal = this.toggleLogoutModal.bind(this)
		this.logoutAuth = this.logoutAuth.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
  }
  toggleAddModal(){
    this.setState({
      showAddModal: !this.state.showAddModal
    })
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
    this.setState({isLoading: true})
    const {REACT_APP_URL} = process.env
    const param = `${qs.stringify(params)}`
    const url = `${REACT_APP_URL}users?${param}`
    const results = await axios.get(url)
    const {data} = results.data
    const pageInfo = results.data.pageInfo
    this.setState({data, pageInfo, isLoading: false})
    if(params){
      this.props.history.push(`?${param}`)
    }
  }
  async componentDidMount(){
		this.checkToken()
    const param = qs.parse(this.props.location.search.slice(1))
    await this.fetchData(param)
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
                      <Input onChange={e => this.setState({search: e.target.value})} className="form-control mr-sm-2" type="search" placeholder="Search ..." aria-label="Search" />
                      <Button onClick={()=>this.fetchData({...params, search: this.state.search})} className="btn-search form-control mr-sm-2" type='button'>Search</Button>
                      <Button onClick={this.toggleLogoutModal} className="btn-danger form-control mr-sm-2" type='button'>Logout</Button>
                    </Form>
                  </span>
                </Collapse>
              </Navbar>
          </Col>
          <Col className='mt-5'>
            <div className='d-flex justify-content-between container'>
              <div className='mt-5'>
                <h4>List Users  </h4>
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((user, index) => (
                  <tr>
                    <th scope="row">{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>
                    <h6>
                      <Link to={{
                          pathname: `/users-detail/${user.id}`,
                          state: {
                            id: `${user.id}`,
                            name: `${user.name}`,
                            email: `${user.email}`,
                            created_at: `${user.created_at}`
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

export default Users