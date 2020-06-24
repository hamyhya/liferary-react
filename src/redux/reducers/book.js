
const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  dataBook: [],
  pageInfo: []
}

const book = (state=initialState, action) => {
  switch(action.type){
    case 'BOOK_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'BOOK_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message,
      }
    }
    case 'BOOK_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataBook: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default book