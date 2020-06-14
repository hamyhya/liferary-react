import React, {Component} from 'react'
import axios from 'axios'
import qs from 'querystring'
import swal from 'sweetalert2'
import {Col, Row, Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, Input, Form} from 'reactstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import dilanfull from '../assets/dilan-full.png'

class DetailUsers extends Component {
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
      showEditModal: false,
      showDeleteModal: false,
      showSuccessModal: false,
      id: props.match.params.id,
      title: props.location.state.title,
      description: props.location.state.description,
      genre: props.location.state.genre,
      author: props.location.state.author,
      picture: props.location.state.picture,
      user_id: 0,
      employee_id: 0,
      genreName: '',
      genreList: [],
      adminList: []
    }
    this.deleteBook = this.deleteBook.bind(this)
    this.updateBook = this.updateBook.bind(this)
    this.borrowBook = this.borrowBook.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    this.toggleBorrowModal = this.toggleBorrowModal.bind(this)
  }
  home = (e) =>{
    e.preventDefault()
    
    this.props.history.push('/')
  }
  handlerChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }
  borrowBook = (event) => {
    event.preventDefault()
    this.setState({isLoading: true})
    const authorData = {
        book_id: this.state.id,
        user_id: this.state.user_id,
        employee_id: this.state.employee_id
    }
    
    console.log(authorData)
    const {REACT_APP_URL} = process.env
    const url = `${REACT_APP_URL}transactions`
    axios.post(url, authorData).then( (response) => {
        console.log(response) 
        this.setState({ showBorrowModal: !this.state.showBorrowModal })
        swal.fire({
         icon: 'success',
         title: 'Success',
         text: 'Yay! borrow book success'
       })
      })
      .catch(function (error) {
        console.log(error.response)
        swal.fire({
					icon: 'error',
					title: 'Oops!',
					text: "Book has been booked right now"
				})
       })
       this.props.history.push('/dashboard')
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
  toggleBorrowModal(){
    this.setState({
      showBorrowModal: !this.state.showBorrowModal
    })
  }
  async deleteBook(){
    const {REACT_APP_URL} = process.env
    await axios.delete(`${REACT_APP_URL}books/${this.state.id}`)
    swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Poof! delete success'
    })
    this.props.history.push('/dashboard')
  }
  handlerChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }
  updateBook = (event) => {
    event.preventDefault()
    this.setState({isLoading: true})
    const bookData = new FormData()
		bookData.append('picture', this.state.picture)
		bookData.set('title', this.state.title)
		bookData.set('description', this.state.description)
		bookData.set('genre', this.state.genre)
		bookData.set('author', this.state.author)
    
    console.log(bookData)
    const {REACT_APP_URL} = process.env
    const url = `${REACT_APP_URL}books/${this.state.id}`
    axios.patch(url, bookData).then( (response) => {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error.response);
        swal.fire({
					icon: 'error',
					title: 'Oops!',
					text: "Something's wrong, I can feel it"
				})
       }) 
       this.props.history.push('/dashboard')
       this.fetchData()
       swal.fire({
        icon: 'success',
        title: 'Success',
        text: "Good! Update successfully"
      })
  }
  fetchData = async () => {
		this.setState({isLoading: true})
		const {REACT_APP_URL} = process.env
		const url = `${REACT_APP_URL}genres/${this.state.genre}`
		const results = await axios.get(url)
    const {data} = results.data
    return data
  }
  genreList = async () => {
		this.setState({isLoading: true})
		const {REACT_APP_URL} = process.env
		const url = `${REACT_APP_URL}genres`
		const results = await axios.get(url)
    this.setState({genreList: results.data.data})
  }
  adminList = async () => {
		this.setState({isLoading: true})
		const {REACT_APP_URL} = process.env
		const url = `${REACT_APP_URL}employes`
		const results = await axios.get(url)
    this.setState({adminList: results.data.data})
  }
  
	async componentDidMount(){
		this.checkToken()
    const data = await this.fetchData()
    await this.genreList()
    await this.adminList()
    this.setState({genreName: data.name})
	}
  render(){
    return(
      <>
        <div className="details">
          <div className="half-cover">
            <div className='w-100 cover-content d-flex justify-content-between p-4'>
              <div className='back'>
                <Link to='/dashboard-user' className='btn back-btn btn-lg btn-light'>Back</Link>
              </div>
              <div className='option-btn'>
              </div>
            </div>
          </div>
          <div className="full-cover w-100 d-flex justify-content-end container">
            <img className='img-fluid' src={this.state.picture} alt="full-cover" />
          </div>
          <div className="book-details container">
            <div className="tag">
              <h4><span class="badge badge-detail text-white">{this.state.genreName}</span></h4>
              
              </div>
            <Row>
              <Col md={8}>
                <div className="info d-flex justify-content-between">
                  <h1>{this.state.title}</h1>
                </div>
                <h5>By {this.state.author}</h5>
              </Col>
            </Row>
            <Row className="desc d-flex mt-4 mb-5">
              <Col md={8}>
              <p>{this.state.description}</p>
              </Col>
              <Col md={4} className="borrow align-self-end d-flex justify-content-end">
              </Col>
            </Row>
          </div>
        </div>
        <div className='footer w-100 d-flex justify-content-center align-items-center'>
          <h6 className='text-white'>Crafted with love by <a className='text-white' href='https://instagram.com/ilhambagasaputra'>Ilham Bagas Saputra</a></h6>
        </div>

      </>
    )
  }
}

export default DetailUsers