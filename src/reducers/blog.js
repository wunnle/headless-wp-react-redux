

const initialState = {
  posts: [],
  categories: [],
  currentURL: '/',
  loading: false,
  error: null
}

export default function blog(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_POSTS_BEGIN':
    return {
      ...state,
      loading: true
    }

    case 'FETCH_POSTS_SUCCESS':
    return {
      ...state,
      posts: action.payload.posts,
      loading: state.categories.length > 0 ? false : true
    }

    case 'FETCH_POSTS_FAIL':
    return {
      ...state,
      error: action.payload.error,
      posts: []
    }

    case 'FETCH_CATEGORIES_BEGIN':
    return {
      ...state,
      loading: true,
    }

    case 'FETCH_CATEGORIES_SUCCESS':
    return {
      ...state,
      categories: action.payload.categories,
      loading: state.posts.length > 0 ? false : true
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