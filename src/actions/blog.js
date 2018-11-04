import { push } from 'connected-react-router'

// Fetching blog posts

export function fetchPosts(url) {
  return dispatch => {
    dispatch(fetchPostsBegin())
    return fetch("https://wunnle.com/headless/wp-json/wp/v2/article?_embed")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchPostsSuccess(json))
        console.log(json)
        return json
      })
      .catch(error => dispatch(fetchPostsFail(error)))
  }
}

const handleErrors = (res) => {
  if(!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export const fetchPostsBegin = () => ({
  type: 'FETCH_POSTS_BEGIN'
})

export const fetchPostsSuccess = (posts) => ({
  type: 'FETCH_POSTS_SUCCESS',
  payload: { posts }
})

export const fetchPostsFail = (error) => ({
  type: 'FETCH_POSTS_FAIL',
  payload: { error }
})

// Fetch blog categories

export function fetchCategories() {
  return dispatch => {
    dispatch(fetchCategoriesBegin())
    return fetch("https://wunnle.com/headless/wp-json/wp/v2/categories")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchCategoriesSuccess(json))
        return json
      })
      .catch(error => dispatch(fetchCategoriesFail(error)))
  }
}

export const fetchCategoriesBegin = () => ({
  type: 'FETCH_CATEGORIES_BEGIN'
})

export const fetchCategoriesSuccess = (categories) => ({
  type: 'FETCH_CATEGORIES_SUCCESS',
  payload: { categories }
})

export const fetchCategoriesFail = (error) => ({
  type: 'FETCH_CATEGORIES_FAIL',
  payload: { error }
})


// Navigating in blog

export const changePage = url => {
  console.log('navigating to post', url)
  return (dispatch, getstate) => {
    const { blog } = getstate()    
    if(blog.posts.find(post => post.slug === url)) {
      dispatch(navigateToPost(url))
      dispatch(push(url))
    }
    return
  }
}

export const navigateToPost = (slug) => ({
  type: 'NAVIGATE_TO_POST',
  payload: { slug }
})

export const navigateBegin = () => ({
  type: 'NAVIGATE_BEGIN',
})