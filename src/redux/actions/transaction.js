import axios from '../../services/Axios'
const {REACT_APP_URL} = process.env

const getTransaction = (param) =>{
const url = `${REACT_APP_URL}transactions?${param}`
return {
  type: 'GETTRANSACTION',
  payload: axios().get(url)
  }
}

const postTransaction = (dataSubmit) =>{
const url = `${REACT_APP_URL}transactions`
return {
  type: 'POSTTRANSACTION',
  payload: axios().post(url, dataSubmit)
  }
}

const penaltyTransaction = (id) =>{
const url = `${REACT_APP_URL}transactions/penalty/${id}`
return {
  type: 'PENALTYTRANSACTION',
  payload: axios().patch(url)
  }
}

const accTransaction = (id, dataSubmit) =>{
  const url = `${REACT_APP_URL}transactions/acc/${id}`
  return {
    type: 'ACCTRANSACTION',
    payload: axios().patch(url, dataSubmit)
    }
  }

const deleteTransaction = (id) =>{
const url = `${REACT_APP_URL}transactions/${id}`
return {
  type: 'DELETETRANSACTION',
  payload: axios().delete(url)
  }
}


export {getTransaction, deleteTransaction, postTransaction, penaltyTransaction, accTransaction}
