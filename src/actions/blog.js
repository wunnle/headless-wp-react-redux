
// Fetching blog posts

export function fetchPosts(url) {
  return dispatch => {
    dispatch(fetchPostsBegin())
    return fetch("http://wunnle.com/headless/wp-json/wp/v2/article?_embed")
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


// Navigating in blog

export const changePage = url => {
  console.log('navigating to post', url)
  return (dispatch, getstate) => {
    const { blog } = getstate()    
    console.log(getstate())
    if(blog.posts.find(post => post.slug === url)) {
      dispatch(navigateToPost(url))
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