import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import '../../css/style.scss'
import { connect } from 'react-redux'
import { Header } from './common/Header';
import { Footer } from './common/Footer';
import Home from './Home'
import SinglePost from './SinglePost'
import CategoriesPage from './Categories'


class Blog extends Component {
  componentDidMount() {
    console.log('componentDidMount!')
  }

  getCategoryNameFromId = categoryId => {
    this.props.categories.forEach(cat => {
      if (categoryId === cat.id) {
        return cat.name
      }
    })
  }

  render() {

    const {loadingAllPosts, loadingCategories} = this.props

    console.log('RENDER CONDITION', {loadingAllPosts}, {loadingCategories})

    if (this.props.error) {
      return <div>something went wrong</div>
    }

    return (
      <div className="blog">
        <div className="content">
          <Header />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route exact path="/:postname" component={SinglePost} />
            <Route exact path="/category/:categorySlug" component={CategoriesPage} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.blog.posts,
  categories: state.blog.categories,
  loadingAllPosts: state.blog.loadingAllPosts,
  loadingCategories: state.blog.loadingCategories,
  error: state.blog.error
})

export default withRouter(connect(mapStateToProps)(Blog))
