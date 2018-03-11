const initialState = {
  articles: [],
  loading: false,
  error: null
}

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_POSTS_BEGIN':
    return {
      ...state,
      loading: true,
      error: null
    }

    case 'FETCH_POSTS_SUCCESS':
    console.log(action)
    return {
      ...state,
      loading: false,
      articles: action.payload.posts
    }

    case 'FETCH_POSTS_FAIL':
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      articles: []
    }

    default:
    return state
  }
}