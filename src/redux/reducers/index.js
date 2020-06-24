import {combineReducers} from 'redux'

import login from './login'
import book from './book'

const reducer = combineReducers({
  login,
  book
})

export default reducer