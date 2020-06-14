import React, {Component, useState} from 'react'
import axios from 'axios'
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
import { Carousel, Jumbotron } from 'react-bootstrap'

import {
	BrowserRouter as Router,
	Link
} from "react-router-dom";

import logo from '../assets/smeatech.png'
import profile from '../assets/profile.png'
import card from '../assets/dilan-card.png'

class ListUsers extends Component {
	constructor(props){
		super(props)
		this.checkToken = () => {
      if(!localStorage.getItem('token')){
				props.history.push('/login')
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
			data: [],
			title: '',
			description: '',
			genre: 0,
			author: '',
			image: '',
			userId: 0,
			genreList: []
		}
		this.toggleAddModal = this.toggleAddModal.bind(this)
		this.toggleLogoutModal = this.toggleLogoutModal.bind(this)
		this.toggleNavbar = this.toggleNavbar.bind(this)
		this.logoutAuth = this.logoutAuth.bind(this)
		this.addBook = this.addBook.bind(this)
	}
	handlerChange = (e) =>{
		this.setState({[e.target.name]: e.target.value})
	}
	toggleAddModal(){
		this.setState({
			showAddModal: !this.state.showAddModal
		})
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
		this.setState({isLoading: true},()=>{
				this.setState({isLoading: false}, ()=>{
					localStorage.removeItem('token')
						this.props.history.push('/')
				})
		})
	}
	async addBook (event) {
		event.preventDefault()
		const {REACT_APP_URL} = process.env
		const dataSubmit = new FormData()
		dataSubmit.append('picture', this.state.image)
		dataSubmit.set('title', this.state.title)
		dataSubmit.set('description', this.state.description)
		dataSubmit.set('genre', this.state.genre)
		dataSubmit.set('author', this.state.author)

		const url = `${REACT_APP_URL}books`
		await axios.post(url, dataSubmit).then( (response) => {
				console.log(response);
				this.setState({showAddModal: false})
				this.fetchData()
				swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Nais! Book added'
				})
			})
			.catch(function (error) {
				swal.fire({
					icon: 'error',
					title: 'Hmmm!',
					text: "Something's wrong, I can feel it"
				})
				console.log(error);
			 })
		this.props.history.push(`/dashboard`)
	}
	fetchData = async (params) => {
		this.setState({isLoading: true})
		const {REACT_APP_URL} = process.env
		const param = `${qs.stringify(params)}`
		const url = `${REACT_APP_URL}books?${param}`
		const results = await axios.get(url)
		const {data} = results.data
		const pageInfo = results.data.pageInfo
		this.setState({data, pageInfo, isLoading: false})
		if(params){
			this.props.history.push(`?${param}`)
		}
	}
	genreList = async () => {
		this.setState({isLoading: true})
		const {REACT_APP_URL} = process.env
		const url = `${REACT_APP_URL}genres`
		const results = await axios.get(url)
		this.setState({genreList: results.data.data})
  }
	async componentDidMount(){
		const param = qs.parse(this.props.location.search.slice(1))
		await this.fetchData(param)
		this.checkToken()
		await this.genreList()
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
					<div className='container'>
						<Jumbotron className='carousel-books mt-5'>
							<Carousel>
								{this.state.data.map((book, index) => (
									<Carousel.Item>
										<img style={{ height: '200px' }}
											className="d-block"
											src={book.picture}
											alt="cover"
										/>
										<Carousel.Caption>
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
						<div>
							<Button className='btn btn-add-admin' onClick={this.toggleAddModal}>Add Book</Button>
						</div>
					</div>
				</Col>
				<Col className='mt-5'>
					<div className='container'>
						{<Button className='btn-sm btn-sort' onClick={()=>this.fetchData({...params, sort: 0})}>Asc</Button>}&nbsp;|&nbsp;
						{<Button className='btn-sm btn-sort' onClick={()=>this.fetchData({...params, sort: 1})}>Desc</Button>}
					</div>
				</Col>
				<Col className='mt-1'>
					<div className='container'>
						<Row>
							<CardDeck>
							{this.state.data.map((book, index) => (
								<Col className='mt-4' md={4}>
									<Card>
										<CardImg top width="100%" src={book.picture} alt="Card image cap" />
										<CardBody>
											<CardTitle><h4><Link to={{
													pathname: `/detail-user/${book.id}`,
													state: {
														id: `${book.id}`,
														title: `${book.title}`,
														description: `${book.description}`,
														genre: `${book.genre}`,
														author: `${book.author}`,
														picture: `${book.picture}`
													}
												}}><a className='text-black'>{book.title}</a></Link></h4></CardTitle>
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
						<Form>
							<ModalBody>
									<h6>Title</h6>
									<Input type='text' name='title' className='mb-2 shadow-none' onChange={this.handlerChange}/>
									<h6>Description</h6>
									<Input type='textarea' name='description' className='mb-3 shadow-none' onChange={this.handlerChange}/>
									<h6>Author</h6>
									<Input type='text' name='author' className='mb-3 shadow-none' onChange={this.handlerChange}/>
									<h6>Genre</h6>
									<Input type='select' name='genre' className="mb-3 shadow-none" onChange={this.handlerChange} value={this.state.genre}>
                    {this.state.genreList.map((genre, index) =>(
                    <option className="list-group-item bg-light" value={genre.id}>{genre.name}</option>
                    ))}
                  </Input> 
									<h6>Cover Image</h6>
									<Input type='file' name='image' className='mb-2' onChange={(e) => this.setState({image: e.target.files[0]})}/>
							</ModalBody>
							<ModalFooter>
									<Button color="primary" onClick={this.addBook}>Add Book</Button>
									<Button color="secondary" onClick={this.toggleAddModal}>Cancel</Button>
							</ModalFooter>
						</Form>
				</Modal>

				{/* Penalty Modal */}
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

export default ListUsers