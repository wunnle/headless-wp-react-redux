import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchAllPosts, fetchCategories } from "../../actions/blog"
import { LoadingCards } from './common/LoadingCards';
import PostCard from '../PostCard'
import { withRouter } from 'react-router-dom'
import Seo from '../Seo'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const { allPostsAreLoaded, allCategoriesAreLoaded } = this.props

    if (!allPostsAreLoaded) {
      this.props.dispatch(fetchAllPosts())
    }

    if (!allCategoriesAreLoaded) {
      this.props.dispatch(fetchCategories())
    }
  }

  render() {
    const { allPostsAreLoaded, allCategoriesAreLoaded } = this.props

    return (
      <>
        <Seo
          title='Home'
          description={'A blog about front-end development, design and maybe some short stories.'}
          path='/'
          image='https://blog.wunnle.com/logo.png'
        />
        <p className="blog-description">A blog about front-end development, design and maybe some short stories.</p>
        <div className="articles">
          {
            (allPostsAreLoaded && allCategoriesAreLoaded)
              ? this.props.posts.map(post =>
                <PostCard key={post.id} data={post} getCategoryNameFromId={this.getCategoryNameFromId} />)
              :
              <LoadingCards />
          }
        </div>
      </>
    );
  }
}


const mapStateToProps = state => ({
  posts: state.blog.posts,
  categories: state.blog.categories,
  loading: state.blog.loading,
  error: state.blog.error,
  allPostsAreLoaded: state.blog.allPostsAreLoaded,
  allCategoriesAreLoaded: state.blog.allCategoriesAreLoaded
})

export default withRouter(connect(mapStateToProps)(Home))