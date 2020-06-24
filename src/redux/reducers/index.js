import {combineReducers} from 'redux'

import login from './login'
import book from './book'
import genre from './genre'
import user from './user'
import admin from './admin'

const reducer = combineReducers({
  login,
  book,
  genre,
  user,
  admin
})

export default reducer