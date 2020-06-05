import React, {Component} from 'react'
import axios from 'axios'
import {Row, Col, Table} from 'reactstrap'

class ListData extends Component {
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
        <Row>
          <Col md={3}></Col>
          <Col md={9}>
            <Table className='bordered'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Desc</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
              {this.state.data.map((user, index) => (    
                    <tr>
                      <td>{user.title}</td>
                      <td>{user.description}</td>
                      <td>{user.genre}</td>
                      <td>{user.author}</td>
                    </tr>
                    ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </>
    )
  }
}

export default ListData