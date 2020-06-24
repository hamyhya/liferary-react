import axios from '../../services/Axios'
const {REACT_APP_URL} = process.env

const getAdmin = (param) =>{
const url = `${REACT_APP_URL}employes?${param}`
return {
  type: 'GETADMIN',
  payload: axios().get(url)
  }
}

const postAdmin = (dataSubmit) =>{
const url = `${REACT_APP_URL}employes`
return {
  type: 'POSTADMIN',
  payload: axios().post(url, dataSubmit)
  }
}

const patchAdmin = (id, dataSubmit) =>{
const url = `${REACT_APP_URL}employes/${id}`
return {
  type: 'PATCHADMIN',
  payload: axios().patch(url, dataSubmit)
  }
}

const deleteAdmin = (id) =>{
const url = `${REACT_APP_URL}employes/${id}`
return {
  type: 'DELETEADMIN',
  payload: axios().delete(url)
  }
}


export {getAdmin, deleteAdmin, postAdmin, patchAdmin}
