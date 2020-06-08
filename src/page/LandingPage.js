import React, {Component} from 'react'
import axios from 'axios'
import qs from 'querystring'
import {Row, Col, Input, Container, Table, Button, Navbar, Form, 
} from 'reactstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import card from '../assets/dilan-card.png'

class LandingPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      pageInfo: {},
      isLoading: false
    }
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
    const params = qs.parse(this.props.location.search.slice(1))
    params.page = params.page || 1
    params.sort = 0
    return(
      <>
        <div className='landing-page'>
          <div className='landing-jumbotron'>
            <div className='landing-nav'>
            <Navbar className="navbar justify-content-between">
              <div className='container'>
                <a class="navbar-brand text-white " href="#">Liferary</a>
                <Form className="form-inline">
                  <Link to='/login'><button className="btn btn-outline-light my-2 my-sm-0" data-toggle data-target='#content' type="submit">Login</button></Link>
                </Form>
              </div>
            </Navbar>
            </div>
            <div className='jumbotron-content mt-5'>
              <div className='landing-text text-white container'>
                <h1>Library is</h1>
                <h1>Life</h1>
                <p>Love, Life, Library</p>
              </div>
              <div className='container mt-5'>
                <Link><button className="btn btn-light my-2 my-sm-0 font-weight-bold" type="submit">Discover</button></Link>
              </div>
            </div>
          </div>
          <div className='landing-content mt-5'>
            <h1 className='d-flex justify-content-center'>Checkout Our Collections!</h1>
            <div className='d-flex justify-content-center mt-4'>
              <Form className="form-inline d-flex justify-content-center col-md-7">
                <input className="find-book form-control col-md-6" type="search" placeholder="Find some book ..." aria-label="Search" />
                <button className="btn btn-go ml-3" id='content' type="submit">Go!</button>
              </Form>
            </div>
            <div className='d-flex justify-content-center'>
            <Row className='w-100 mt-5 container'>
              <Col className='list-book-landing d-flex justify-content-center'>
                <Row className=''>
                {this.state.data.map((book, index) => (
                    <Col md={4}>
                      <div className="card-deck mt-4">
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
            </div>
          </div>
          <Row className='mt-5 mb-5'>
                <Col md={12}>
                  <div className='d-flex flex-row justify-content-between'>
                    <div>
                      {<Button onClick={()=>this.fetchData({...params, page: parseInt(params.page)-1})}>Prev</Button>}
                      <Input type="select" name="select" id="exampleSelect">
                        <option>1</option>
                        <option><Input onClick={()=>this.fetchData({...params, sort: 1})}>Desc</Input></option>
                      </Input>
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
          <div className='footer w-100 d-flex justify-content-center align-items-center'>
            <h6 className='text-white'>Crafted with love by <a className='text-white' href='https://instagram.com/ilhambagasaputra'>Ilham Bagas Saputra</a></h6>
          </div>
        </div>
      </>
    )
  }
}
export default LandingPage