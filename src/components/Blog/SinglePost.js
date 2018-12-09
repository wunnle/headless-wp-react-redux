import React, { Component } from 'react';
import Post from '../Post'
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

    const { posts, match, allCategoriesAreLoaded } = this.props
    const p = posts.length > 0 ? posts.find(post => post.slug === match.params.postname) : false

    if(posts.length > 0 && p && allCategoriesAreLoaded ) {
      return <Post data={p} type='solo' />
    } else if (!p && allCategoriesAreLoaded ) {
      return <div>404</div>
    } else {
      return "Loading"
    }
  }
}
 

const mapStateToProps = state => ({
  posts: state.blog.posts,
  categories: state.blog.categories,
  loading: state.blog.loading,
  error: state.blog.error,
  allCategoriesAreLoaded: state.blog.allCategoriesAreLoaded
})

export default withRouter(connect(mapStateToProps)(SinglePost))