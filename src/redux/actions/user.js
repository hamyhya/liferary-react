import axios from '../../services/Axios'
const {REACT_APP_URL} = process.env

const getUser = (param) =>{
const url = `${REACT_APP_URL}users?${param}`
return {
  type: 'GETUSER',
  payload: axios().get(url)
  }
}

const postUser = (dataSubmit) =>{
const url = `${REACT_APP_URL}users`
return {
  type: 'POSTUSER',
  payload: axios().post(url, dataSubmit)
  }
}

const patchUser = (id, dataSubmit, token) =>{
const url = `${REACT_APP_URL}users/${id}`
return {
  type: 'PATCHUSER',
  payload: axios(token).patch(url, dataSubmit)
  }
}

const deleteUser = (id, token) =>{
const url = `${REACT_APP_URL}users/${id}`
return {
  type: 'DELETEUSER',
  payload: axios(token).delete(url)
  }
}


export {getUser, deleteUser, postUser, patchUser}
