
const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  dataGenre: [],
  pageInfo: []
}

const genre = (state=initialState, action) => {
  switch(action.type){
    case 'GETGENRE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'GETGENRE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message,
      }
    }
    case 'GETGENRE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataGenre: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo
      }
    }
    case 'POSTGENRE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'POSTGENRE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'POSTGENRE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    }
    case 'PATCHGENRE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'PATCHGENRE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'PATCHGENRE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    }
    case 'DELETEGENRE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'DELETEGENRE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case 'DELETEGENRE_FULFILLED': {
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

export default genre