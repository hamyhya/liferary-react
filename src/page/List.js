import React, {Component} from 'react'
import axios from 'axios'
import {Row, Col, Nav, Form, Card, CardImg, CardBody, CardText, 
  CardTitle, CardSubtitle} from 'reactstrap'
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
    this.state = {
      data: []
    }
  }
  async componentDidMount(){
    const results = await axios.get('http://localhost:8080/books')
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
                  <li className='pt-2'><h5>Explore</h5></li>
                  <li className='pt-2'><h5>History</h5></li>
                  <li className='pt-2'><h5>Add Book</h5></li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={10} className=''>
            <Row>
              <Col>
                <Nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
                  <a className="navbar-brand font-weight-bold" href="#">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
                      Liferary
                  </a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item active">
                        <a className="nav-link" href="#">All Categories <span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">All Time</a>
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
                <h4>List Books</h4>
                <Row>
                {this.state.data.map((book, index) => (
                  <Col md={4}>
                    <div className="card-deck p-2 mt-4 col-md-12">
                      <div className="card">
                        <img className="card-img-top" src={card} alt="Card image cap" />
                        <div className="card-body">
                          <h5 className="card-title"><Link to={'/detail/'+book.id}><a classNameName='text-black'>{book.title}</a></Link></h5>
                          <p className="card-text">{book.description}</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    )
  }
}

export default List