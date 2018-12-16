import React, { Component } from 'react';
import Post from '../Post'
import LoadingPost from '../Post/loading'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories, fetchSinglePost } from "../../actions/blog"


class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    const { match, dispatch, posts } = this.props

    if((posts.length === 0 || posts.length > 0) && !posts.find(post => post.slug === match.params.postname)) {
      dispatch(fetchSinglePost(match.params.postname))
      dispatch(fetchCategories())
    }
  }

  render() { 

    const { posts, match, allCategoriesAreLoaded, loadingCategories, loadingSinglePost } = this.props
    const p = posts.length > 0 ? posts.find(post => post.slug === match.params.postname) : false

    if(posts.length > 0 && p && allCategoriesAreLoaded ) {
      return <Post data={p} type='solo' />
      //return <LoadingPost />
    } else if (loadingCategories || loadingSinglePost) {
      //return "Loading"
      return <LoadingPost />
    } else {
      return <div>404</div>
    }
  }
}
 

const mapStateToProps = state => ({
  posts: state.blog.posts,
  categories: state.blog.categories,
  error: state.blog.error,
  allCategoriesAreLoaded: state.blog.allCategoriesAreLoaded,
  loadingSinglePost: state.blog.loadingSinglePost,
  loadingCategories: state.blog.loadingCategories
})

export default withRouter(connect(mapStateToProps)(SinglePost))