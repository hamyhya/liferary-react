import React, {Component} from 'react'
import swal from 'sweetalert2'
import qs from 'querystring'
import {Row, Col, Nav, Form, Button, Modal, ModalBody, 
	ModalHeader, ModalFooter, Input, Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  NavLink,Card, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody} from 'reactstrap'
import { Carousel, Jumbotron, Dropdown } from 'react-bootstrap'

import {
	BrowserRouter as Router,
	Link
} from "react-router-dom";
import jwt from 'jsonwebtoken'
import {connect} from 'react-redux'

import {getBook} from '../redux/actions/book'
import {logoutAuth} from '../redux/actions/login'



class ListUsers extends Component {
	constructor(props){
		super(props)
		this.state = {
			showAddModal: false,
			showLogoutModal: false,
			showNavbar: false,
			pageInfo: {},
			search: '',
			data: [],
			title: '',
			description: '',
			genre: 0,
			author: '',
			image: '',
			userId: 0,
			genreList: [],
			token: jwt.decode(this.props.login.token)
		}
		this.toggleLogoutModal = this.toggleLogoutModal.bind(this)
		this.toggleNavbar = this.toggleNavbar.bind(this)
		this.logoutAuth = this.logoutAuth.bind(this)
	}
	toggleLogoutModal(){
		this.setState({
			showLogoutModal: !this.state.showLogoutModal
		})
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
	fetchData = (params) => {
		const param = `${qs.stringify(params)}`
		this.props.getBook(param).then( (response) => {

			const pageInfo = this.props.book.pageInfo
	
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
		const param = qs.parse(this.props.location.search.slice(1))
		this.fetchData(param)
		this.authCheck()
	}
	

	render(){
		const {dataBook, isLoading} = this.props.book

		const params = qs.parse(this.props.location.search.slice(1))
		params.page = params.page || 1
		params.search = params.search || ''
		params.sort = params.sort || 0

		return(
			<>
			<Row className='d-flex flex-column w-100'>
				<Col className='w-100'>
					<Navbar className='nav-dashboard fixed-top' light expand="md">
						<Link className='navbar-brand text-white' to='/dashboard-user'>Liferary</Link>
						<NavbarToggler onClick={this.toggleNavbar} />
						<Collapse isOpen={this.state.showNavbar} navbar>
							<Nav className="mr-auto" navbar>
							<NavItem>
                <Link className='nav-link text-white' to='/histories-user'>My Histories</Link>
              </NavItem>
							</Nav>
								<span className="navbar-text">
									<Form className="form-inline">
										<Input onChange={e => this.setState({search: e.target.value})} className="form-control mr-sm-2" type="search" placeholder="Search ..." aria-label="Search" />
										<Button onClick={()=>this.fetchData({...params, search: this.state.search})} className="btn-search form-control mr-sm-2 mt-1 mb-1" type='button'>Search</Button>
										<Button onClick={this.toggleLogoutModal} className="btn-danger form-control mr-sm-2" type='button'>Logout</Button>
									</Form>
								</span>
							</Collapse>
						</Navbar>
				</Col>
				{isLoading ? (
					<center className='mt-5'>
						<div className="d-flex align-items-center spinner-border text-dark mt-5" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</center>
				):(
				<div className='mt-5'>
				<Col className='mt-5'>
					<div className='container'>
						<Jumbotron className='carousel-books mt-5'>
							<Carousel id='carousel'>
								{dataBook.map((book, index) => (
									<Carousel.Item id='carousel-item' key={index}>
										<img style={{ height: '200px' }}
											className="d-block"
											src={book.picture}
											alt="cover"
										/>
										<Carousel.Caption id='carousel-caption'>
											<h3 className="text-white">{book.title}</h3>
											<p>{book.description}</p>
										</Carousel.Caption>
									</Carousel.Item>
								))}
							</Carousel>
						</Jumbotron>
					</div>
				</Col>
						<Col>
							<div className='d-flex justify-content-between container'>
								<div className=''>
									<h4>List Books</h4>
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
								<Row>
									<CardDeck>
									{dataBook.map((book, index) => (
										<Col className='mt-4' md={4} key={index}>
											<Card>
												<CardImg top width="100%" src={book.picture} alt="Card image cap" />
												<CardBody>
													<CardTitle><h4><Link className='a text-black' to={{
															pathname: `/detail-user/${book.id}`,
															state: {
																id: `${book.id}`,
																title: `${book.title}`,
																description: `${book.description}`,
																genre: `${book.genre}`,
																author: `${book.author}`,
																picture: `${book.picture}`
															}
														}}>{book.title}</Link></h4></CardTitle>
													<CardSubtitle>By <b>{book.author}</b></CardSubtitle>
													<CardText>{book.description}</CardText>
												</CardBody>
											</Card>
										</Col>
									))}
									</CardDeck>
								</Row>
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
	book: state.book,
	login: state.login
})

const mapDispatchToProps = {getBook, logoutAuth}

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers)