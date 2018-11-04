import React, { Component } from 'react'
import { Route, Link, withRouter  } from 'react-router-dom'
import Post from '../Post'
import "../../css/style.scss"
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories, changePage } from "../../actions/blog"

class Blog extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts())
    this.props.dispatch(fetchCategories())
  }

  handleChangePage = (slug) => {
    console.log('handleChangePage')
    this.props.dispatch(changePage(slug))
  }

  render() {
    if(this.props.loading) {
      return <div>loading</div>
    } 

    if(this.props.error) {
      return <div>something went wrong</div>
    }
    
    if(this.props.posts.length > 0 && this.props.categories.length > 0) {
      console.log(typeof(this.props.categories))
      console.log(this.props.categories)
      return (
        <div className="blog">
          <div className="content">
            <div className="container">
              <Header/>
              <p className="blog-description">A blog about front-end development, design and maybe some short stories.</p>
              <div className="articles">
                <Route exact path="/" render={() => this.props.posts.map(post => <Link to={post.slug}>
                  <PostCard data={post} key={post.id} handleChangePage={this.handleChangePage} type='excerpt' />
                </Link>)} />
              </div>
              <Route exact path="/:postName" render={({match}) => {
                const p = this.props.posts.find(post => post.slug === match.params.postName)
                if(p) {
                  return (
                    <Post data={p} handleChangePage={this.handleChangePage} type='solo'/>
                  )
                } else {
                  return ('404')
                }
              }
              } />
              <Route exact path="/category/:categoryName" render={({match}) => {
                const categoryID = this.props.categories.find(category => category.slug === match.params.categoryName).id
                return (
                  this.props.posts.filter(post => post.categories[0] === categoryID)
                  .map(post => <Post data={post} handleChangePage={this.handleChangePage} key={post.id} type='excerpt'/>)
                )
              }
             } />
            </div>
          </div>
          <Footer />
        </div>
        );
    } else {
      return 'not much to see'
    }
  }
}

const Footer = (props) => (
  <footer>
  <div className="container">
    <i className="papership-bw" />
  </div>
  </footer>
)

const Header = (props) => (
  <header>
    <i className="papership" />
    <h1 onClick={props.handleHomeClick}>
      { <Link to="/">blog</Link>}
    </h1>
  </header>
);

const PostCard = props => {
  const bgUrl = props.data.better_featured_image ? props.data.better_featured_image.source_url : ''
  return (
  <div className="postCard" 
  style={{backgroundImage: `url(${bgUrl})`}}
  >

      <div className="postCard__inner">
      <div className="postCard__cat">Category</div>
      <h2>The Motion Picture</h2>
      <div>
        <span className="postCard__date">Feb 25</span>
        <span className="postCard__read-time">4 min read</span>
      </div>
      </div>
  </div>
)
}

const mapStateToProps = state => ({
  posts: state.blog.posts,
  categories: state.blog.categories,
  loading: state.blog.loading,
  error: state.blog.error
})

export default withRouter(connect(mapStateToProps)(Blog))
