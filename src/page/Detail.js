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
      data: []
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
      })
      .catch(function (error) {
        console.log(error.response)
        swal.fire({
					icon: 'error',
					title: 'Oops!',
					text: "Something's wrong, I can feel it"
				})
       }) 
       this.setState({ showBorrowModal: !this.state.showBorrowModal })
       this.props.history.push('/transactions')
       swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Yay! borrow book success'
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
	async componentDidMount(){
		const param = qs.parse(this.props.location.search.slice(1))
		await this.fetchData(param)
	}
  render(){
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
              <h4><span class="badge badge-detail text-white">{this.state.genre}</span></h4>
            </div>
            <Row>
              <Col md={8}>
                <div className="info d-flex justify-content-between">
                  <h1>{this.state.title}</h1>
                  <h5 className='d-flex align-items-center text-success'>Available</h5>
                </div>
                <h5>By {this.state.author}</h5>
              </Col>
            </Row>
            <Row className="desc d-flex mt-4 mb-5">
              <Col md={8}>
              <p>{this.state.description}</p>
              </Col>
              <Col md={4} className="borrow align-self-end d-flex justify-content-end">
                <button type='button' className='btn btn-lg btn-borrow m-5' onClick={this.toggleBorrowModal}>Borrow</button>
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
									<Input type='text' name='description' className='mb-3 shadow-none' value={this.state.description} onChange={this.handlerChange}/>
									<h6>Author</h6>
									<Input type='text' name='author' className='mb-3 shadow-none' value={this.state.author} onChange={this.handlerChange}/>
									<h6>Genre</h6>
									<Input type='text' name='genre' className='mb-3 shadow-none' onChange={this.handlerChange}/>
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

          {/* Borrow Modal */}
          <Modal isOpen={this.state.showBorrowModal}>
            <ModalHeader className='h1'>Borrow Book</ModalHeader>
            <ModalBody>
              <h6>User ID</h6>
              <Input name='user_id' onChange={this.handlerChange} type='text' className='mb-2'/>
              <h6>Admin ID</h6>
              <Input name='employee_id' onChange={this.handlerChange} type='text' className='mb-2'/>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={this.borrowBook}>Borrow</Button>
              <Button color='secondary' onClick={this.toggleBorrowModal}>Cancel</Button>
            </ModalFooter>
          </Modal>

          {/* Delete Succes Modal */}
          <Modal isOpen={this.state.showSuccessModal}>
            <ModalHeader className='h1'>Delete success</ModalHeader>
            <ModalBody className='d-flex justify-content-center align-items-center'>
                {/* <img className='centang' src={centang} alt='SuccessImage'/> */}
            </ModalBody>
            <ModalFooter>
                <Button className='btn-success' onClick={this.home} >Home</Button>
            </ModalFooter>
          </Modal>
      </>
    )
  }
}

export default Detail