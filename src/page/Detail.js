import React, {Component} from 'react'
import {Col, Row, Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, Input} from 'reactstrap'
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
      data: []
    }
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    this.toggleBorrowModal = this.toggleBorrowModal.bind(this)
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
              <h3 className='text-white'><Link><a onClick={this.toggleEditModal}>Edit </a></Link> 
              | <Link><a onClick={this.toggleDeleteModal}>Delete</a></Link></h3>
              </div>
            </div>
          </div>
          <div className="full-cover w-100 d-flex justify-content-end container">
            <img className='img-fluid pt-1' src={dilanfull} alt="full-cover" />
          </div>
          <div className="book-details container">
            <div className="tag">
              <h4><span class="badge badge-detail text-white">Novel</span></h4>
            </div>
            <Row>
              <Col md={8}>
                <div className="info d-flex justify-content-between">
                  <h1>DILAN 1990</h1>
                  <h5 className='d-flex align-items-center text-success'>Available</h5>
                </div>
                <h5>30 Juni 2019</h5>
              </Col>
            </Row>
            <Row className="desc d-flex mt-4 mb-5">
              <Col md={8}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam eget est rutrum ultrices. Donec laoreet enim a massa dapibus, cursus egestas dui pulvinar. Proin sit amet accumsan lectus. Nullam auctor auctor consequat. Donec semper magna erat, sed fringilla lacus pretium eget. Cras porttitor, nibh sit amet interdum bibendum, nibh velit accumsan tellus, vel vehicula tellus leo vitae ipsum. Praesent sit amet libero sed orci ullamcorper efficitur. Pellentesque in euismod purus, sit amet ultrices tortor. Vestibulum ante dui, tempor at dui id, tincidunt euismod diam. Integer pellentesque massa nibh, ac eleifend odio malesuada sed. Phasellus orci sem, cursus nec orci ut, accumsan facilisis lacus. Nullam at elementum nibh, ac gravida felis. In sagittis rhoncus nisi tempus dignissim. Sed fringilla consequat ante vitae lobortis. Cras posuere ligula vel enim suscipit malesuada. Vivamus non nulla ut ante imperdiet euismod quis nec massa.
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
          <ModalBody>
            <h6>Title</h6>
            <Input type='text' className='mb-2'/>
            <h6>Description</h6>
            <Input type='text' className='mb-2'/>
            <h6>Image URL</h6>
            <Input type='text' className='mb-2'/>
            <h6>Author</h6>
            <Input type='text' className='mb-2'/>
            <h6>Genre</h6>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
            </Input>
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

          {/* Borrow Modal */}
          <Modal isOpen={this.state.showBorrowModal}>
            <ModalHeader className='h1'>Borrow Book</ModalHeader>
            <ModalBody>
              <h6>User ID</h6>
              <Input type='text' className='mb-2'/>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick=''>Borrow</Button>
              <Button color='secondary' onClick={this.toggleBorrowModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
      </>
    )
  }
}

export default Detail