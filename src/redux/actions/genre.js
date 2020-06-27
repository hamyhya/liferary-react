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

const postGenre = (dataSubmit) =>{
const url = `${REACT_APP_URL}genres`
return {
  type: 'POSTGENRE',
  payload: axios().post(url, dataSubmit)
  }
}

const patchGenre = (id, dataSubmit) =>{
const url = `${REACT_APP_URL}genres/${id}`
return {
  type: 'PATCHGENRE',
  payload: axios().patch(url, dataSubmit)
  }
}

const deleteGenre = (id) =>{
const url = `${REACT_APP_URL}genres/${id}`
return {
  type: 'DELETEGENRE',
  payload: axios().delete(url)
  }
}


export {getGenre, getGenreId, deleteGenre, postGenre, patchGenre}
