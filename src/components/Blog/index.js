import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Post from '../Post'
import PostCard from '../PostCard'
import '../../css/style.scss'
import { connect } from 'react-redux'
import { Header } from './common/Header';
import { LoadingCards } from './common/LoadingCards';
import Home from './Home'
import SinglePost from './SinglePost'


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
    console.log(this.props, 'props')
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
            <Route exact path="/category/:categoryName" render={({ match }) => {
                if(this.props.categories && this.props.categories.length > 0) {
                  const category = this.props.categories.find(category => category.slug === match.params.categoryName)
                  const { id, name } = category
                  return (
                    <>
                    <h2>Posts in {name}</h2>
                    <div className="articles">
                    {this.props.posts.filter(post => post.categories[0] === id)
                      .map(post => <PostCard data={post} key={post.id} type='excerpt' />)}
                    </div>
                    </>
                  )
                } else {
                  return <LoadingCards/>
                }
            }
            } />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const Footer = (props) => (
  <footer>
    <div className="container">
      <i className="papership-bw" />
    </div>
  </footer>
)

const mapStateToProps = state => ({
  posts: state.blog.posts,
  categories: state.blog.categories,
  loading: state.blog.loading,
  error: state.blog.error
})

export default withRouter(connect(mapStateToProps)(Blog))
