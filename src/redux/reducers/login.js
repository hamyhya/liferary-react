
const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  token: null
}

const login = (state=initialState, action) => {
  switch(action.type){
    case 'LOGIN_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message,
      }
    }
    case 'LOGIN_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        token: action.payload.data.token
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default login