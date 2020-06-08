import React, {Component} from 'react'
import axios from 'axios'
import {Row, Col, Nav, Form, Button, Modal, ModalBody, 
  ModalHeader, ModalFooter, Input, Table} from 'reactstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import logo from '../assets/smeatech.png'
import profile from '../assets/profile.png'
import card from '../assets/dilan-card.png'

class Administrators extends Component {
  constructor(props){
    super(props)
    this.state = {
      showAddModal: false,
      data: []
    }
    this.toggleAddModal = this.toggleAddModal.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
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
  async componentDidMount(){
    const results = await axios.get('http://localhost:8080/employes')
    const {data} = results.data
    this.setState({data})
  }

  render(){
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
                    <Link to='/administrators'><a className='text-white' href=''>Administrators</a></Link>
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
                    <span className="navbar-text">
                    <Form class="form-inline">
                      <input class="form-control mr-sm-2" type="search" placeholder="Search ..." aria-label="Search" />
                    </Form>
                    </span>
                  </div>
                </Nav>
              </Col>
            </Row>
            <Row className='w-100 list-book'>
              <Col className='list-book-content'>
                <Row className='d-flex justify-content-between'>
                  <Col>
                  <h4>List Admins</h4>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                  <Button className='btn btn-add-admin' onClick={this.toggleAddModal}>Add Admin</Button>
                  </Col>
                </Row>
                <Row>
                  <Table bordered className='mt-5'>
                    <thead>
                      <tr>
                        <th>Admin ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((admin, index) => (
                      <tr>
                        <th scope="row">{admin.id}</th>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>
                          <h6><Link><a className='text-warning' onClick={this.toggleEditModal}>Edit </a></Link>|
                          <Link><a className='text-danger' onClick={this.toggleDeleteModal}> Delete</a></Link></h6> 
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </Table>
                </Row>
              </Col>
            </Row>
          </Col>
            <div className='footer w-100 d-flex justify-content-center align-items-center'>
              <h6 className='text-white'>Crafted with love by <a className='text-white' href='https://instagram.com/ilhambagasaputra'>Ilham Bagas Saputra</a></h6>
            </div>
        </Row>

        {/* Add Modal */}
        <Modal isOpen={this.state.showAddModal}>
          <ModalHeader className='h1'>Add Admin</ModalHeader>
          <ModalBody>
            <h6>Name</h6>
            <Input type='text' className='mb-2'/>
            <h6>Email</h6>
            <Input type='text' className='mb-2'/>
            <h6>Password</h6>
            <Input type='password' className='mb-2'/>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick=''>Add</Button>
            <Button color='secondary' onClick={this.toggleAddModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        
         {/* Edit Modal */}
         <Modal isOpen={this.state.showEditModal}>
          <ModalHeader className='h1'>Edit Admin</ModalHeader>
          <ModalBody>
            <h6>Name</h6>
            <Input type='text' className='mb-2'/>
            <h6>Email</h6>
            <Input type='text' className='mb-2'/>
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
      </>
    )
  }
}

export default Administrators