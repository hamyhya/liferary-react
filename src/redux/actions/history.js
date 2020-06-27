import axios from '../../services/Axios'
const {REACT_APP_URL} = process.env

const getHistory = (param) =>{
const url = `${REACT_APP_URL}histories?${param}`
return {
  type: 'GETHISTORY',
  payload: axios().get(url)
  }
}

const getHistoryUser = (param, dataSubmit) =>{
  const url = `${REACT_APP_URL}histories/user?${param}`
  return {
    type: 'GETHISTORY',
    payload: axios().post(url, dataSubmit)
  }
}

const postHistory = (dataSubmit) =>{
const url = `${REACT_APP_URL}histories`
return {
  type: 'POSTHISTORY',
  payload: axios().post(url, dataSubmit)
  }
}

const patchHistory = (id, dataSubmit) =>{
const url = `${REACT_APP_URL}histories/${id}`
return {
  type: 'PATCHHISTORY',
  payload: axios().patch(url, dataSubmit)
  }
}

const deleteHistory = () =>{
const url = `${REACT_APP_URL}histories`
return {
  type: 'DELETEHISTORY',
  payload: axios().delete(url)
  }
}


export {getHistory, getHistoryUser, deleteHistory, postHistory, patchHistory}
