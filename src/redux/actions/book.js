import axios from '../../services/Axios'
const {REACT_APP_URL} = process.env

const getBook = (param) =>{
const url = `${REACT_APP_URL}books?${param}`
return {
  type: 'GETBOOK',
  payload: axios().get(url)
  }
}

const postBook = (dataSubmit, token) =>{
const url = `${REACT_APP_URL}books`
return {
  type: 'POSTBOOK',
  payload: axios(token).post(url, dataSubmit)
  }
}

const patchBook = (id, bookData, token) =>{
const url = `${REACT_APP_URL}books/${id}`
return {
  type: 'PATCHBOOK',
  payload: axios(token).patch(url, bookData)
  }
}

const deleteBook = (id, token) =>{
const url = `${REACT_APP_URL}books/${id}`
return {
  type: 'DELETEBOOK',
  payload: axios(token).delete(url)
  }
}


export {getBook, deleteBook, postBook, patchBook}
