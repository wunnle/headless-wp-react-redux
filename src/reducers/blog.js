

const initialState = {
  posts: [],
  categories: [],
  currentURL: '/',
  loadingSinglePost: false,
  loadingAllPosts: false,
  loadingCategories: false,
  allCategoriesAreLoaded: false,
  allPostsAreLoaded: false,
  loadingPostsOnCategoryOf: null,
  categoriesFullyLoaded: [],
  error: null
}

export default function blog(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_ALL_POSTS_BEGIN':
    return {
      ...state,
      loadingAllPosts: true
    }

    case 'FETCH_ALL_POSTS_SUCCESS':
    return {
      ...state,
      posts: action.payload.posts,
      loadingAllPosts: false,
      allPostsAreLoaded: true
    }

    case 'FETCH_ALL_POSTS_FAIL':
    return {
      ...state,
      error: action.payload.error,
      loadingAllPosts: false,
      posts: []
    }

    case 'FETCH_SINGLE_POST_BEGIN':
    return {
      ...state,
      loadingSinglePost: true
    }

    case 'FETCH_SINGLE_POST_SUCCESS':

    console.log('payload', action.payload)

    return {
      ...state,
      loadingSinglePost: false,
      posts: [...state.posts, ...action.payload.post],
    }

    case 'FETCH_SINGLE_POST_FAIL':
    return {
      ...state,
      loadingSinglePost: false,
      error: action.payload.error
    }    

    case 'FETCH_CATEGORIES_BEGIN':
    return {
      ...state,
      loadingCategories: true
    }

    case 'FETCH_CATEGORIES_SUCCESS':
    return {
      ...state,
      categories: action.payload.categories,
      loadingCategories: false,
      allCategoriesAreLoaded: true
    }

    case 'FETCH_POSTS_ON_CATEGORY_BEGIN':
    return {
      ...state,
      loadingPostsOnCategoryOf: action.payload.category
    }

    case 'FETCH_POSTS_ON_CATEGORY_SUCCESS':
    return {
      ...state,
      posts: action.payload.posts,
      loadingPostsOnCategoryOf: null,
      categoriesFullyLoaded: [...state.categoriesFullyLoaded, action.payload.categoryName]
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