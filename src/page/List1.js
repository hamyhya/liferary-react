import React, {Component} from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import qs from 'querystring'
import {Row, Col, Nav, Form, Button, Modal, ModalBody, 
	ModalHeader, ModalFooter, Input} from 'reactstrap'
import { Carousel, Jumbotron } from 'react-bootstrap'

import {
	BrowserRouter as Router,
	Link
} from "react-router-dom";

import logo from '../assets/smeatech.png'
import profile from '../assets/profile.png'
import card from '../assets/dilan-card.png'

class List extends Component {
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
      // else {
      //   props.history.push('/home')
      // }
    }
		this.state = {
			showAddModal: false,
			showLogoutModal: false,
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
		this.checkToken()
		const param = qs.parse(this.props.location.search.slice(1))
		await this.fetchData(param)
		await this.genreList()
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
								<h5 className='pt-2'>Hola,</h5>
								<h5 className='pt-2'>Ilham Bagas !</h5>
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
									<li className='pt-2'><h5>
										<Button onClick={this.toggleLogoutModal}>Logout</Button>
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
												<a className="nav-link text-white" href="#">Transactions <span className="sr-only">(current)</span></a>
											</li>
											<li className="nav-item">
												<a className="nav-link text-white" href="#">Histories</a>
											</li>
											<li className="nav-item">
												<a className="nav-link text-white" href="#">Administrators</a>
											</li>
											<li className="nav-item">
												<a className="nav-link text-white" href="#">Users</a>
											</li>
										</ul>
										<span className="navbar-text">
										<Form className="form-inline">
											<Input onChange={e => this.setState({search: e.target.value})} className="form-control mr-sm-2" type="search" placeholder="Search ..." aria-label="Search" />
											<Button onClick={()=>this.fetchData({...params, search: this.state.search})} className="btn-search form-control mr-sm-2" type='button'>Search</Button>
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
									<h4>List Books</h4>
									</Col>
									<Col className='d-flex justify-content-end'>
									<Button className='btn btn-add-admin' onClick={this.toggleAddModal}>Add Book</Button>
									</Col>
								</Row>
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
								<div className='mt-5'>
									{<Button className='btn-sm btn-sort' onClick={()=>this.fetchData({...params, sort: 0})}>Asc</Button>}&nbsp;|&nbsp;
									{<Button className='btn-sm btn-sort' onClick={()=>this.fetchData({...params, sort: 1})}>Desc</Button>}
								</div>
								<Row>
								{this.state.data.map((book, index) => (
									<Col md={4}>
										<div className="card-deck p-2 mt-2 col-md-12">
											<div className="card">
												<div className='card-img bg-contain' style={{backgroundImage: `url(${book.picture})`}}>
													{/* <img className="card-img-top" src={book.picture} alt="Card image cap" /> */}
												</div>
												<div className="card-body">
													<h5 className="card-title">
														<Link to={{
															pathname: `/detail/${book.id}`,
															state: {
																id: `${book.id}`,
																title: `${book.title}`,
																description: `${book.description}`,
																genre: `${book.genre}`,
																author: `${book.author}`,
																picture: `${book.picture}`
															}
														}}><a classNameName='text-black'>{book.title}</a>
														</Link>
													</h5>
													<p className="card-text">{book.description}</p>
												</div>
											</div>
										</div>
									</Col>
								))}
								<Row className='mt-5 mb-5 container d-flex justify-content-center'>
									<Col md={12} className='d-flex justify-content-center'>
										<div className='pagination-btn d-flex flex-row justify-content-between'>
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
									<Input type='select' name='genre' className="mb-3 shadow-none" onChange={this.handlerChange}>
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

export default List