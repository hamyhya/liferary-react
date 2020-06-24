
const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  dataAdmin: [],
  pageInfo: []
}

const admin = (state=initialState, action) => {
  switch(action.type){
    case 'GETADMIN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'GETADMIN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message,
      }
    }
    case 'GETADMIN_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataAdmin: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo
      }
    }
    case 'POSTADMIN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'POSTADMIN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'POSTADMIN_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    }
    case 'PATCHADMIN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'PATCHADMIN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'PATCHADMIN_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    }
    case 'DELETEADMIN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'DELETEADMIN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'DELETEADMIN_FULFILLED': {
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

export default admin