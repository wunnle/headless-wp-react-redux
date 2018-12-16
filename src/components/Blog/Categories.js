import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import PostCard from '../PostCard'
import { LoadingCards } from './common/LoadingCards';
import { connect } from 'react-redux'
import { fetchCategories, fetchPostsOnCategory } from '../../actions/blog'
import PlaceholderText from '../Blog/common/PlaceholderText'



class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  componentDidMount() {
    const { dispatch, match, allCategoriesAreLoaded, categories, allPostsAreLoaded } = this.props

    if(!allCategoriesAreLoaded) {
      dispatch(fetchCategories())
    }

    const categorySlug = match.params.categoryName
    this.setState({ categorySlug })

    if(allPostsAreLoaded) {
      const category = categories.filter(cat => cat.slug === categorySlug)[0]
      const categoryId = category.id
      const categoryName = category.name

      this.setState({categoryId, categoryName})
    }
  }

  componentDidUpdate() {
    const { allCategoriesAreLoaded, categoriesFullyLoaded, categories, dispatch } = this.props
    const { categorySlug, categoryId } = this.state

    if (allCategoriesAreLoaded && categoriesFullyLoaded.length === 0 && !categoryId) {
      const category = categories.filter(cat => cat.slug === categorySlug)[0]
      const categoryId = category.id
      const categoryName = category.name

      this.setState({ categoryId, categoryName })
      dispatch(fetchPostsOnCategory(categoryId, categorySlug))
    }
  }

  render() {
    const { categoriesFullyLoaded, posts, allPostsAreLoaded } = this.props
    const { categorySlug, categoryId, categoryName } = this.state

      return (
        <div className='categories'>
          <h2 className='categories__title'>{ categoryName ? `Posts in ${categoryName}` : <PlaceholderText count='8' /> }</h2>

          
          <div className="articles">
          {(categoriesFullyLoaded.includes(categorySlug) || allPostsAreLoaded) ? posts.filter(post => (post.categories[0] === categoryId)).map(post => <PostCard data={post} key={post.id} type='excerpt' />) : <LoadingCards/>  }
          </div>
          
        </div>
      )
  }
}

const mapStateToProps = state => ({
  posts: state.blog.posts,
  categories: state.blog.categories,
  loadingAllPosts: state.blog.loadingAllPosts,
  loadingCategories: state.blog.loadingCategories,
  allCategoriesAreLoaded: state.blog.allCategoriesAreLoaded,
  categoriesFullyLoaded: state.blog.categoriesFullyLoaded,
  allPostsAreLoaded: state.blog.allPostsAreLoaded,
  error: state.blog.error
})

export default withRouter(connect(mapStateToProps)(Categories))
