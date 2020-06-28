import axios from '../../services/Axios'
const {REACT_APP_URL} = process.env

const getGenre = (param) =>{
const url = `${REACT_APP_URL}genres?${param}`
return {
  type: 'GETGENRE',
  payload: axios().get(url)
  }
}

const getGenreId = (id) =>{
  const url = `${REACT_APP_URL}genres/${id}`
  return {
    type: 'GETGENREID',
    payload: axios().get(url)
  }
}

const postGenre = (dataSubmit, token) =>{
const url = `${REACT_APP_URL}genres`
return {
  type: 'POSTGENRE',
  payload: axios(token).post(url, dataSubmit)
  }
}

const patchGenre = (id, dataSubmit, token) =>{
const url = `${REACT_APP_URL}genres/${id}`
return {
  type: 'PATCHGENRE',
  payload: axios(token).patch(url, dataSubmit)
  }
}

const deleteGenre = (id, token) =>{
const url = `${REACT_APP_URL}genres/${id}`
return {
  type: 'DELETEGENRE',
  payload: axios(token).delete(url)
  }
}


export {getGenre, getGenreId, deleteGenre, postGenre, patchGenre}
