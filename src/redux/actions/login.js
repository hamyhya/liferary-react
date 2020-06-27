import qs from 'querystring'
import axios from 'axios'
const {REACT_APP_URL} = process.env

const loginAdmin = (email, password)=>{
  return {
    type: 'LOGIN',
    payload: axios.post(`${REACT_APP_URL}employes/login`, qs.stringify({email, password}))
  }
}

const loginUser = (email, password)=>{
  return {
    type: 'LOGIN',
    payload: axios.post(`${REACT_APP_URL}users/login`, qs.stringify({email, password}))
  }
}

const logoutAuth = ()=>{
  return {
    type: 'LOGOUT',
    payload: ''
  }
}

export {loginAdmin, loginUser, logoutAuth}