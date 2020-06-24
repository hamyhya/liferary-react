import qs from 'querystring'
import axios from '../../services/Axios'
const {REACT_APP_URL} = process.env

const getBook = (param) =>{
const url = `${REACT_APP_URL}books?${param}`
return {
  type: 'GETBOOK',
  payload: axios().get(url)
  }
}

const postBook = (dataSubmit) =>{
const url = `${REACT_APP_URL}books`
return {
  type: 'POSTBOOK',
  payload: axios().post(url, dataSubmit)
  }
}

const patchBook = (id, bookData) =>{
const url = `${REACT_APP_URL}books/${id}`
return {
  type: 'PATCHBOOK',
  payload: axios().patch(url, bookData)
  }
}

const deleteBook = (id) =>{
const url = `${REACT_APP_URL}books/${id}`
return {
  type: 'DELETEBOOK',
  payload: axios().delete(url)
  }
}


export {getBook, deleteBook, postBook, patchBook}
