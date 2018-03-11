const initialState = {
  posts: [],
  loading: false,
  error: null
}

export default function blog(state = initialState, action) {
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
      posts: action.payload.posts
    }

    case 'FETCH_POSTS_FAIL':
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      posts: []
    }

    default:
    return state
  }
}