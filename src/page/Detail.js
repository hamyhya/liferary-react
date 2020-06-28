import React, {Component} from 'react'
import axios from 'axios'
import qs from 'querystring'
import Select from 'react-select'
import swal from 'sweetalert2'
import {Col, Row, Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, Input, Form} from 'reactstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import jwt from 'jsonwebtoken'
import {connect} from 'react-redux'

import {deleteBook, patchBook} from '../redux/actions/book'
import {getGenre, getGenreId} from '../redux/actions/genre'

class Detail extends Component {
  constructor(props){
    super(props)
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
      token: jwt.decode(this.props.login.token)
    }
    this.deleteBook = this.deleteBook.bind(this)
    this.updateBook = this.updateBook.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    this.genreChange = this.genreChange.bind(this)
  }
  handlerChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }
  genreChange = (e) => {
    this.setState({ genre : e.value })
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
  deleteBook(){
    const {id} = this.state
    const token = this.props.login.token

    this.props.deleteBook(id, token).then((response) => {
      swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Poof! delete success'
      })
      this.props.history.push('/dashboard')
    })
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
    
    
    const token = this.props.login.token
    const {id} = this.state
    this.props.patchBook(id, bookData, token).then( (response) => {
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
  fetchData = () => {
		const {genre} = this.state
		this.props.getGenreId(genre)
  }
  genreList = () => {
		this.props.getGenre()
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
    this.fetchData()
    this.genreList()
	}
  render(){
    const {dataGenre, dataGenreId} = this.props.genre 
    return(
      <>
        <div className="details">
          <div className="half-cover">
            <div className='w-100 cover-content d-flex justify-content-between p-4'>
              <div className='back'>
                <Link to='/dashboard' className='btn back-btn btn-lg btn-light'>Back</Link>
              </div>
              <div className='option-btn'>
              <h3 className='text-white'><Link><a onClick={this.toggleEditModal}>Edit</a></Link> 
              &nbsp;| <Link><a onClick={this.toggleDeleteModal}>Delete</a></Link></h3>
              </div>
            </div>
          </div>
          <div className="full-cover w-100 d-flex justify-content-end container">
            <img className='img-fluid' src={this.state.picture} alt="full-cover" />
          </div>
          <div className="book-details container">
            <div className="tag">
              <h4><span class="badge badge-detail text-white">{dataGenreId}</span></h4>
              
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
            </Row>
          </div>
        </div>
        <div className='footer w-100 d-flex justify-content-center align-items-center'>
          <h6 className='text-white'>Crafted with love by <a className='text-white' href='https://instagram.com/ilhambagasaputra'>Ilham Bagas Saputra</a></h6>
        </div>

        {/* Edit Modal */}
        <Modal isOpen={this.state.showEditModal}>
          <ModalHeader className='h1'>Edit Book</ModalHeader>
          	<Form>
							<ModalBody>
									<h6>Title</h6>
									<Input type='text' name='title' className='mb-2 shadow-none' value={this.state.title} onChange={this.handlerChange}/>
									<h6>Description</h6>
									<Input type='textarea' name='description' className='mb-3 shadow-none' value={this.state.description} onChange={this.handlerChange}/>
									<h6>Author</h6>
									<Input type='text' name='author' className='mb-3 shadow-none' value={this.state.author} onChange={this.handlerChange}/>
									<h6>Genre</h6>
									{/* <Input type='select' name='genre' className="mb-3 shadow-none" onChange={this.handlerChange} value={this.state.genre}>
                    {this.state.genreList.map((genre, index) =>(
                    <option className="list-group-item bg-light" value={genre.id}>{genre.name}</option>
                    ))}
                  </Input>  */}
                  <Select onChange={this.genreChange} options={
                    dataGenre.map((genre) =>(
                      { value: genre.id, label: genre.name}
                      ))
                  } value={this.state.genre}/>
									<h6>Image</h6>
									<Input type='file' name='picture' className='mb-2' onChange={(e) => this.setState({picture: e.target.files[0]})}/>
							</ModalBody>
							<ModalFooter>
									<Button color="primary" onClick={this.updateBook}>Edit Book</Button>
									<Button color="secondary" onClick={this.toggleEditModal}>Cancel</Button>
							</ModalFooter>
						</Form>
        </Modal>

         {/* Delete Modal */}
         <Modal isOpen={this.state.showDeleteModal}>
            <ModalBody className='h4'>Are you sure?</ModalBody>
            <ModalFooter>
              <Button color='danger' onClick={this.deleteBook}>Delete</Button>
              <Button color='secondary' onClick={this.toggleDeleteModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
      </>
    )
  }
}

const mapStateToProps = state => ({
  genre: state.genre,
  login: state.login
})

const mapDispatchToProps = {deleteBook, patchBook, getGenre, getGenreId}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)