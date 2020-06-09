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
import LandingPage from './page/LandingPage'
import LoginAdmin from './page/LoginAdmin'
import Administrators from './page/Administrators'
import Transactions from './page/Transactions'

class App extends Component {
  render(){
    return(
      <>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={LandingPage} />
            <Route path='/login' component={Login}/>
            <Route path='/admin' component={LoginAdmin}/>
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={List} />
            <Route path='/administrators' component={Administrators} />
            <Route path='/transactions' component={Transactions} />
            <Route path='/detail/:id' component={Detail} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App