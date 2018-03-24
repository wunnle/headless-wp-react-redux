import React, { Component } from 'react'
import { Route, Link, withRouter  } from 'react-router-dom'
import Post from '../Post'
import "../../css/style.css"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchPosts, fetchCategories, changePage } from "../../actions/blog"

class Blog extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts())
    this.props.dispatch(fetchCategories())
  }

  handleChangePage = (slug) => {
    console.log('handleChangePage')
    this.props.dispatch(push(slug))
    this.props.dispatch(changePage(slug)) // guess I don't need this
  }

  render() {
    if(this.props.loading) {
      return <div>loading</div>
    } 

    if(this.props.error) {
      return <div>something went wrong</div>
    }
    
    if(this.props.posts) {
      return (
        <div className="App">
          <div className="content">
            <div className="container">
              <Header/>
              <Route exact path="/" render={() => this.props.posts.map(post => <Post data={post} handleChangePage={this.handleChangePage} type='excerpt'/> )} />
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
            </div>
          </div>
          <Footer />
        </div>
        );
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


const mapStateToProps = state => ({
  posts: state.blog.posts,
  loading: state.blog.loading,
  error: state.blog.error
})

export default withRouter(connect(mapStateToProps)(Blog))
