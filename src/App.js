import React, {Component} from 'react'
import Greetings from './components/Greetings'
import Register from './page/Register'
import Detail from './page/Detail'
import Login from './page/Login'
import List from './page/List';

class App extends Component {
  render(){
    return(
      <>
        <Login />
      </>
    )
  }
}

export default App