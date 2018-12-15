import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import PostCard from '../PostCard'
import { LoadingCards } from './common/LoadingCards';
import { connect } from 'react-redux'
import { fetchCategories, fetchPostsOnCategory } from '../../actions/blog'



class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  componentDidMount() {
    const { dispatch, match } = this.props

    dispatch(fetchCategories())
    const categoryName = match.params.categoryName
    this.setState({ categoryName })
  }

  componentDidUpdate(prevProps) {
    const { allCategoriesAreLoaded, categoriesFullyLoaded, categories, dispatch } = this.props
    const { categoryName, categoryId } = this.state


    if (allCategoriesAreLoaded && categoriesFullyLoaded.length === 0 && !categoryId) {
      let categoryId

      categories.forEach(cat => {

        if (cat.slug === categoryName) {
          categoryId = cat.id
        }
      })

      this.setState({ categoryId })
      dispatch(fetchPostsOnCategory(categoryId, categoryName))
    }
  }

  render() {
    const { categoriesFullyLoaded, posts } = this.props
    const { categoryName, categoryId } = this.state


    if (categoriesFullyLoaded.includes(categoryName)) {

      posts.forEach(post => console.log(post.categories[0] === categoryId))

      return (
        <>
          <h2>Posts in {categoryName}</h2>
          <div className="articles">
            {posts.filter(post => (post.categories[0] === categoryId)).map(post => <PostCard data={post} key={post.id} type='excerpt' />)}
          </div>
        </>
      )
    } else {
      return <LoadingCards/>
    }
  }
}

const mapStateToProps = state => ({
  posts: state.blog.posts,
  categories: state.blog.categories,
  loadingAllPosts: state.blog.loadingAllPosts,
  loadingCategories: state.blog.loadingCategories,
  allCategoriesAreLoaded: state.blog.allCategoriesAreLoaded,
  categoriesFullyLoaded: state.blog.categoriesFullyLoaded,
  error: state.blog.error
})

export default withRouter(connect(mapStateToProps)(Categories))
