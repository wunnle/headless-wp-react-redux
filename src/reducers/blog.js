const initialState = {
  posts: [],
  currentURL: '/',
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

    case 'NAVIGATE_TO_POST':
    return {
      ...state,
      currentURL: action.payload.slug,
      currentPostData: state.posts.find(post => post.slug === action.payload.slug)
    }

    case 'NAVIGATE_BEGIN':
    return {
      ...state,
    }

    default:
    return state
  }
}