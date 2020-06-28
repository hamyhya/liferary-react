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
  Input, 
  Table, 
  ModalFooter, 
  Collapse,
  Navbar,
  NavbarToggler,
  NavItem} from 'reactstrap'
import {Dropdown} from 'react-bootstrap'
import {
  Link
} from "react-router-dom";
import jwt from 'jsonwebtoken'
import {connect} from 'react-redux'

import {getHistoryUser} from '../redux/actions/history'
import {logoutAuth} from '../redux/actions/login'


class HistoriesUser extends Component {
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
		this.toggleNavbar = this.toggleNavbar.bind(this)
		this.toggleLogoutModal = this.toggleLogoutModal.bind(this)
		this.logoutAuth = this.logoutAuth.bind(this)
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
  fetchData = (params) => {
    const historiesData = {
      user: this.state.token.name
    }
    const param = `${qs.stringify(params)}`
		this.props.getHistoryUser(param, historiesData).then( (response) => {

			const pageInfo = this.props._history.pageInfo
	
			this.setState({pageInfo})
			if(param){
					this.props.history.push(`?${param}`)
			}
		})
  }
  authCheck = () => {
		
    if((this.props.login.token === null)){
			this.props.history.goback()
			swal.fire({
				icon: 'error',
				title: 'Oopss!',
				text: "You've to login as user first"
			})
    } else if (this.state.token.role !== 'user') {
			this.props.history.goback()
			swal.fire({
				icon: 'error',
				title: 'Oopss!',
				text: "You've to login as user first"
			})
		}
  }
  componentDidMount(){
		this.authCheck()
    const param = qs.parse(this.props.location.search.slice(1))
    this.fetchData(param)
  }

  render(){
    const {dataHistory} = this.props._history

    const params = qs.parse(this.props.location.search.slice(1))
    params.page = params.page || 1
    params.search = params.search || ''
    params.sort = params.sort || 0
    return(
      <>
        <Row className='d-flex flex-column w-100'>
          <Col className='w-100'>
            <Navbar className='nav-dashboard fixed-top' light expand="md">
						  <Link to='/dashboard-user' className='navbar-brand text-white'>Liferary</Link>
              <NavbarToggler onClick={this.toggleNavbar} />
              <Collapse isOpen={this.state.showNavbar} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <Link to='/histories-user' className='nav-link text-white'>My Histories</Link>
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
                <h4>My Histories</h4>
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
                        <th>No</th>
                        <th>Transaction ID</th>
                        <th>Title</th>
                        <th>User</th>
                        <th>Employee</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataHistory.map((history, index) => (
                      <tr>
                        <th scope="row">{history.id}</th>
                        <td>{history.transaction_id}</td>
                        <td>{history.title}</td>
                        <td>{history.user}</td>
                        <td>{history.employee}</td>
                        <td>{history.date}</td>
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
  _history: state.history,
  login: state.login
})

const mapDispatchToPops = {getHistoryUser, logoutAuth}

export default connect(mapStateToProps, mapDispatchToPops)(HistoriesUser)