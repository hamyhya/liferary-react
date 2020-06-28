import qs from 'querystring'
import axios from '../../services/Axios'
const {REACT_APP_URL} = process.env

const register = (name, email, password)=>{
  return {
    type: 'LOGOUT',
    payload: axios().post(`${REACT_APP_URL}users`, qs.stringify({name, email, password}))
  }
}

const registerAdmin = (dataSubmit, token)=>{
  return {
    type: 'LOGOUT',
    payload: axios(token).post(`${REACT_APP_URL}employes`, qs.stringify(dataSubmit))
  }
}

const loginAdmin = (email, password)=>{
  return {
    type: 'LOGIN',
    payload: axios().post(`${REACT_APP_URL}employes/login`, qs.stringify({email, password}))
  }
}

const loginUser = (email, password)=>{
  return {
    type: 'LOGIN',
    payload: axios().post(`${REACT_APP_URL}users/login`, qs.stringify({email, password}))
  }
}

const logoutAuth = ()=>{
  return {
    type: 'LOGOUT',
    payload: ''
  }
}

export {register, registerAdmin, loginAdmin, loginUser, logoutAuth}