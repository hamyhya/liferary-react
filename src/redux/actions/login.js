import qs from 'querystring'
import axios from 'axios'
const {REACT_APP_URL} = process.env

export const loginAdmin = (email, password)=>{
  return {
    type: 'LOGIN',
    payload: axios.post(`${REACT_APP_URL}employes/login`, qs.stringify({email, password}))
  }
}