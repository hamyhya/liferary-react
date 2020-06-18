import React, {Component} from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import Register from './page/Register'
import Detail from './page/Detail'
import Login from './page/Login'
import List from './page/List';
import LandingPage from './page/LandingPage'
import LoginAdmin from './page/LoginAdmin'
import Administrators from './page/Administrators'
import Transactions from './page/Transactions'
import AdministratorsDetail from './page/AdministratorDetail'
import TransactionDetail from './page/TransactionDetail'
import Users from './page/Users'
import UserDetail from './page/UserDetail'
import Histories from './page/Histories'
import ListUsers from './page/ListUsers'
import DetailUsers from './page/DetailUsers'
import Genres from './page/Genres'
import GenreDetail from './page/GenreDetail'
import HistoriesUser from './page/HistoriesUser'

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
            <Route path='/dashboard-user' component={ListUsers} />
            <Route path='/administrators' component={Administrators} />
            <Route path='/administrators-detail/:id' component={AdministratorsDetail} />
            <Route path='/transactions' component={Transactions} />
            <Route path='/transactions-detail/:id' component={TransactionDetail} />
            <Route path='/detail/:id' component={Detail} />
            <Route path='/detail-user/:id' component={DetailUsers} />
            <Route path='/users' component={Users} />
            <Route path='/users-detail/:id' component={UserDetail} />
            <Route path='/histories' component={Histories} />
            <Route path='/histories-user' component={HistoriesUser} />
            <Route path='/genres' component={Genres} />
            <Route path='/genres-detail/:id' component={GenreDetail} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App