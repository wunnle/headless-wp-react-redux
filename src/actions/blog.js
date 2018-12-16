import { push } from 'connected-react-router'

// Fetching blog posts

export function fetchAllPosts(url) {
  return dispatch => {
    dispatch(fetchAllPostsBegin())
    return fetch("https://wunnle.com/headless/wp-json/wp/v2/article")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchAllPostsSuccess(json))
        return json
      })
      .catch(error => dispatch(fetchAllPostsFail(error)))
  }
}

export const fetchAllPostsBegin = () => ({
  type: 'FETCH_ALL_POSTS_BEGIN'
})

export const fetchAllPostsSuccess = (posts) => ({
  type: 'FETCH_ALL_POSTS_SUCCESS',
  payload: { posts }
})

export const fetchAllPostsFail = (error) => ({
  type: 'FETCH_ALL_POSTS_FAIL',
  payload: { error }
})


// posts on category

export function fetchPostsOnCategory(categoryId, categoryName) {
  return dispatch => {
    dispatch(fetchPostsOnCategoryBegin(categoryName))
    return fetch(`https://wunnle.com/headless/wp-json/wp/v2/article?categories=${categoryId}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchPostsOnCategorySuccess(categoryName, json))
        console.log(json)
        return json
      })
      .catch(error => dispatch(fetchPostsOnCategoryFail(categoryName, error)))
  }
}

export const fetchPostsOnCategoryBegin = (categoryName) => ({
  type: 'FETCH_POSTS_ON_CATEGORY_BEGIN',
  payload: { categoryName }
})

export const fetchPostsOnCategorySuccess = (categoryName, posts) => ({
  type: 'FETCH_POSTS_ON_CATEGORY_SUCCESS',
  payload: { categoryName, posts }
})

export const fetchPostsOnCategoryFail = (category, error) => ({
  type: 'FETCH_POSTS_ON_CATEGORY_FAIL',
  payload: { category, error }
})


// single post

export function fetchSinglePost(slug) {
  console.log(`fetching single post for ${slug}`)
  return dispatch => {
    dispatch(fetchSinglePostBegin())
    return fetch(`https://wunnle.com/headless/wp-json/wp/v2/article?slug=${slug}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        console.log('SINGLE POST', json)
        dispatch(fetchSinglePostSuccess(json))
        console.log(json)
        return json
      })
  }
}

export const fetchSinglePostBegin = () => ({
  type: 'FETCH_SINGLE_POST_BEGIN'
})

export const fetchSinglePostSuccess = (post) => {
  console.log(`fetching single post success!`, post);

  return {
  type: 'FETCH_SINGLE_POST_SUCCESS',
  payload: { post }
}
}
  

export const fetchSinglePostFail = (error) => ({
  type: 'FETCH_SINGLE_POST_FAIL',
  payload: { error }
})



const handleErrors = (res) => {
  if(!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

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