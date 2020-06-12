import React, {Component} from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import qs from 'querystring'
import {Row, Col, Nav, Form, Button, Modal, ModalBody, 
  ModalHeader, ModalFooter, Input, Table} from 'reactstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import logo from '../assets/smeatech.png'
import profile from '../assets/profile.png'
import card from '../assets/dilan-card.png'

class AdministratorsDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      showAddModal: false,
      showSuccessModal: false,
      pageInfo: {},
      search: '',
      id: props.match.params.id,
      name: props.location.state.name,
      email: props.location.state.email,
      password: props.location.state.password,
      data: []
    }
    this.handlerUpdate = this.handlerUpdate.bind(this)
    this.deleteAdmin = this.deleteAdmin.bind(this)
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
  handlerUpdate = (event) => {
    event.preventDefault()
    this.setState({isLoading: true})
    const authorData = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
    }
    
    console.log(authorData)
    const {REACT_APP_URL} = process.env
    const url = `${REACT_APP_URL}employes/${this.state.id}`
    axios.patch(url, authorData).then( (response) => {
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
        text: 'Yahaha! edit admin success'
      })
      this.props.history.push('/administrators')
}
deleteAdmin(){
  const {REACT_APP_URL} = process.env
  console.log(this.state.id)
  axios.delete(`${REACT_APP_URL}employes/${this.state.id}`)
  this.setState({showDeleteModal: !this.state.showDeleteModal})
  this.props.history.push('/administrators')
  swal.fire({
    icon: 'success',
    title: 'Success',
    text: 'Poof! delete admin success'
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
    this.setState({isLoading: true})
    const {REACT_APP_URL} = process.env
    const param = `${qs.stringify(params)}`
    const url = `${REACT_APP_URL}employes?${param}`
    const results = await axios.get(url)
    const {data} = results.data
    const pageInfo = results.data.pageInfo
    this.setState({data, pageInfo, isLoading: false})
    if(params){
      this.props.history.push(`?${param}`)
    }
  }
  async componentDidMount(){
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
        <Row className='w-100 h-100 no-gutters'>
          <Col md={2} className='sidebar h-100 fixed-top'>
            <div className='h-100 p-3'>
              <div className='p-4 profile-img'>
                <img className='' src={profile} />
                <h5 className='pt-2'>Ilham Bagas</h5>
              </div>
              <div className='pt-5'>
                <ul className className='sidebar-list'>
                <li className='pt-2'><h5>
                    <Link to='/dashboard'><a className='text-white' href=''>Dashboard</a></Link>  
                  </h5></li>
                  <li className='pt-2'><h5>
                    <Link to='/transactions'><a className='text-white' href=''>Transactions</a></Link>
                  </h5></li>
									<li className='pt-2'><h5>
										<Link to='/histories'><a className='text-white' href=''>Histories</a></Link>
									</h5></li>
                  <li className='pt-2'><h5>
                    <Link to='/administrators'><a className='text-white' href=''>Administrators</a></Link>
                  </h5></li>
                  <li className='pt-2'><h5>
                    <Link to='/users'><a className='text-white' href=''>Users</a></Link>
                  </h5></li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={10} className=''>
            <Row>
                <Col>
                  <Nav className="navbar nav-dashboard navbar-expand-lg fixed-top">
                    <a className="navbar-brand font-weight-bold text-white" href="#">
                        Liferary
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                      <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                          <a className="nav-link text-white" href="#">All Categories <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link text-white" href="#">All Time</a>
                        </li>
                      </ul>
                    </div>
                  </Nav>
                </Col>
              </Row>
            <Row className='w-100 list-book'>
              <Col className='list-book-content'>
                <div className='detail-wrapper'>
                  <div>
                  <h4><Link to='/administrators'><a className='text-dark mb-5'>Administrators</a></Link> > Detail</h4>
                  </div>
                  <Table bordered className='mt-5'>
                      <tr>
                        <td><h6>Name</h6></td>
                        <td>{this.state.email}</td>
                      </tr>
                      <tr>
                        <td><h6>Email</h6></td>
                        <td>{this.state.email}</td>
                      </tr>
                  </Table>
                  <div className='mt-4'>
                    <Button className='btn-warning' onClick={this.toggleEditModal}>Edit</Button>
                    <Button className='btn-danger ml-3' onClick={this.toggleDeleteModal}>Delete</Button>
                  </div>
                </div>
              </Col>
                <div className='footer w-100 d-flex justify-content-center align-items-center'>
                  <h6 className='text-white'>Crafted with love by <a className='text-white' href='https://instagram.com/ilhambagasaputra'>Ilham Bagas Saputra</a></h6>
                </div>
            </Row>
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
              <Button color='danger' onClick={this.deleteAdmin}>Delete</Button>
              <Button color='secondary' onClick={this.toggleDeleteModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
      </>
    )
  }
}

export default AdministratorsDetail