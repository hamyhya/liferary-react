
const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  dataTransaction: [],
  pageInfo: []
}

const transaction = (state=initialState, action) => {
  switch(action.type){
    case 'GETTRANSACTION_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'GETTRANSACTION_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message,
      }
    }
    case 'GETTRANSACTION_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataTransaction: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo
      }
    }
    case 'POSTTRANSACTION_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'POSTTRANSACTION_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'POSTTRANSACTION_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    }
    case 'PENALTYTRANSACTION_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'PENALTYTRANSACTION_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'PENALTYTRANSACTION_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    }
    case 'ACCTRANSACTION_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'ACCTRANSACTION_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'ACCTRANSACTION_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    }
    case 'DELETETRANSACTION_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'DELETETRANSACTION_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'DELETETRANSACTION_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default transaction