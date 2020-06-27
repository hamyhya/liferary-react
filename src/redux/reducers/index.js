import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import login from './login'
import book from './book'
import genre from './genre'
import user from './user'
import admin from './admin'
import history from './history'
import transaction from './transaction'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
  debug: false,
  // whitelist: ['login, book']
}

const reducer = combineReducers({
  login,
  book,
  genre,
  user,
  admin,
  history,
  transaction
})

export default persistReducer(persistConfig, reducer)