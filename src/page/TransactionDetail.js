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

class TransactionDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      showAddModal: false,
      showPenaltyModal: false,
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
    this.deleteTransaction = this.deleteTransaction.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    this.togglePenaltyModal = this.togglePenaltyModal.bind(this)
  }
  home = (e) =>{
    e.preventDefault()
    
    this.props.history.push('/administrators')
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
                  <h4><Link to='/transactions'><a className='text-dark mb-5'>Transactions</a></Link> > Detail</h4>
                  </div>
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
      </>
    )
  }
}

export default TransactionDetail