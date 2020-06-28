import axios from '../../services/Axios'
const {REACT_APP_URL} = process.env

const getTransaction = (param) =>{
const url = `${REACT_APP_URL}transactions?${param}`
return {
  type: 'GETTRANSACTION',
  payload: axios().get(url)
  }
}

const postTransaction = (dataSubmit, token) =>{
const url = `${REACT_APP_URL}transactions`
return {
  type: 'POSTTRANSACTION',
  payload: axios(token).post(url, dataSubmit)
  }
}

const penaltyTransaction = (id, token) =>{
const url = `${REACT_APP_URL}transactions/penalty/${id}`
return {
  type: 'PENALTYTRANSACTION',
  payload: axios(token).patch(url)
  }
}

const accTransaction = (id, dataSubmit, token) =>{
  const url = `${REACT_APP_URL}transactions/acc/${id}`
  return {
    type: 'ACCTRANSACTION',
    payload: axios(token).patch(url, dataSubmit)
    }
  }

const deleteTransaction = (id, token) =>{
const url = `${REACT_APP_URL}transactions/${id}`
return {
  type: 'DELETETRANSACTION',
  payload: axios(token).delete(url)
  }
}


export {getTransaction, deleteTransaction, postTransaction, penaltyTransaction, accTransaction}
