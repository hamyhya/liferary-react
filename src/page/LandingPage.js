import React, {Component} from 'react'
import axios from 'axios'
import qs from 'querystring'
import {Row, Col, Input, Container, Table, Button, Navbar, Form, 
} from 'reactstrap'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

class LandingPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      search: '',
      pageInfo: {},
      isLoading: false
    }
  }
  handlerChange = (e) =>{
		this.setState({[e.target.name]: e.target.value})
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
    params.sort = params.sort || 0
    params.search = params.search || ''
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
                <Link to='/dashboard-user'><button className="btn btn-light my-2 my-sm-0 font-weight-bold" type="submit">Discover</button></Link>
              </div>
            </div>
          </div>
          <div className='landing-content mt-5'>
            <h1 className='d-flex justify-content-center'>Checkout Our Collections!</h1>
            <div className='d-flex justify-content-center mt-4'>
              <Form className="form-inline d-flex justify-content-center col-md-7">
                <Input onChange={e => this.setState({search: e.target.value})} className="find-book form-control col-md-6" type="search" placeholder="Find some books ..." aria-label="Search" />
                <Button onClick={()=>this.fetchData({...params, search: this.state.search})} className="btn btn-go ml-3" id='content' type="button">Go!</Button>
              </Form>
            </div>
            <div className='d-flex justify-content-center'>
            <Row className='mt-5 container'>
              <Col className='list-book-landing d-flex justify-content-center'>
                <Row className=''>
                {this.state.data.map((book, index) => (
                    <Col md={4}>
                      <div className="card-deck mt-4">
                        <div className="card card-landing">
                          <div className='card-img-landing bg-contain' style={{backgroundImage: `url(${book.picture})`}}>
                          {/* <img className="card-img-top" src={book.picture} alt="Card image cap" /> */}
                        </div>
                          <div className="card-body">
                            <h5 className="card-title">
                              <Link to='/login'><a classNameName='text-black'>{book.title}</a>
                              </Link>
                            </h5>
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
          <div className='footer w-100 d-flex justify-content-center align-items-center'>
            <h6 className='text-white'>Crafted with love by <a className='text-white' href='https://instagram.com/ilhambagasaputra'>Ilham Bagas Saputra</a></h6>
          </div>
        </div>
      </>
    )
  }
}
export default LandingPage