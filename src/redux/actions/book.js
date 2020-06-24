import qs from 'querystring'
import axios from '../../services/Axios'
const {REACT_APP_URL} = process.env

export const getBook = (param) =>{
const url = `${REACT_APP_URL}books?${param}`
return {
  type: 'BOOK',
  payload: axios().get(url)
  }
}