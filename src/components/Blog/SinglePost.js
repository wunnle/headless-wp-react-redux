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
    const { match, dispatch } = this.props

    dispatch(fetchSinglePost(match.params.postname))
    dispatch(fetchCategories())
  }

  render() { 

    const { posts, match, dispatch, categories, allCategoriesAreLoaded } = this.props
    const p = posts.length > 0 ? posts.find(post => post.slug === match.params.postname) : false

    console.log(posts.length, p, allCategoriesAreLoaded)

    if(posts.length > 0 && p && allCategoriesAreLoaded ) {
      console.log('POST DATA', p)
      return <Post data={p} type='solo' />
    } else if (!p && allCategoriesAreLoaded ) {
      return <div>404</div>
    } else {
      return "Loading"
    }
  }
}

            {/* <Route exact path="/:postName" render={({ match }) => {
              const p = this.props.posts.find(post => post.slug === match.params.postName)
              if(this.props.loading) {
                return 'loading'
              } else if(p) {
                return (
                  <Post data={p}  type='solo' />
                )
              } else {
                return ('404')
              }
            }
            } /> */}
 

const mapStateToProps = state => ({
  posts: state.blog.posts,
  categories: state.blog.categories,
  loading: state.blog.loading,
  error: state.blog.error,
  allCategoriesAreLoaded: state.blog.allCategoriesAreLoaded

})

export default withRouter(connect(mapStateToProps)(SinglePost))