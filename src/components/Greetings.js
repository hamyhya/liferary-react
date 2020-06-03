import React, {Component} from 'react'

class Greetings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.name
    }
  }
  render(){
    return(
      <>
        <div className="text">
          <h1>Holaa</h1>
        </div>
      </>
    )
  }
}

export default Greetings
