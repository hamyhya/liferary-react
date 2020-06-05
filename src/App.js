import React, {Component} from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import Greetings from './components/Greetings'
import Register from './page/Register'
import Detail from './page/Detail'
import Login from './page/Login'
import List from './page/List';
import ListData from './page/ListData'

class App extends Component {
  render(){
    return(
      <>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={List} />
            <Route path='/detail' component={Detail} />
            <Route path='/list-data' component={ListData} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App