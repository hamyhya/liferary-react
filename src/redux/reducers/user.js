
const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  dataUser: [],
  pageInfo: []
}

const user = (state=initialState, action) => {
  switch(action.type){
    case 'GETUSER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'GETUSER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message,
      }
    }
    case 'GETUSER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataUser: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo
      }
    }
    case 'POSTUSER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'POSTUSER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'POSTUSER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    }
    case 'PATCHUSER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'PATCHUSER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'PATCHUSER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    }
    case 'DELETEUSER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'DELETEUSER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'DELETEUSER_FULFILLED': {
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

export default user