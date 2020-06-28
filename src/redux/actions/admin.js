import axios from '../../services/Axios'
const {REACT_APP_URL} = process.env

const getAdmin = (param) =>{
const url = `${REACT_APP_URL}employes?${param}`
return {
  type: 'GETADMIN',
  payload: axios().get(url)
  }
}

const postAdmin = (dataSubmit, token) =>{
const url = `${REACT_APP_URL}employes`
return {
  type: 'POSTADMIN',
  payload: axios(token).post(url, dataSubmit)
  }
}

const patchAdmin = (id, dataSubmit, token) =>{
const url = `${REACT_APP_URL}employes/${id}`
return {
  type: 'PATCHADMIN',
  payload: axios(token).patch(url, dataSubmit)
  }
}

const deleteAdmin = (id, token) =>{
const url = `${REACT_APP_URL}employes/${id}`
return {
  type: 'DELETEADMIN',
  payload: axios(token).delete(url)
  }
}


export {getAdmin, deleteAdmin, postAdmin, patchAdmin}
