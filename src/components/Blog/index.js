import React, { Component } from 'react'
import { Route, Link, withRouter  } from 'react-router-dom'
import Post from '../Post'
import PostCard from '../PostCard'
import "../../css/style.scss"
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories, changePage } from "../../actions/blog"
import htmlToText from "html-to-text"

class Blog extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts())
    this.props.dispatch(fetchCategories())
  }

  handleChangePage = slug => {
    console.log('handleChangePage')
    this.props.dispatch(changePage(slug))
  }

  getCategoryNameFromId = categoryId => {
    this.props.categories.forEach(cat => {
      if(categoryId === cat.id) {
        console.log(`found it!`, cat.id, cat.name)
        return cat.name
      }
    })
  }

  calcTimeToRead = content => {
    let words, imgs = 0;

    const wps = 0.218340611, ips = 12;

    let el = document.createElement("html");
    el.innerHTML = content;
    imgs = el.querySelectorAll("img").length;

    words = htmlToText.fromString(content).length;
    return Math.floor(Math.floor((words * wps + imgs * ips) / 60));
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
                <Route exact path="/" render={() => this.props.posts.map(post => <Link to={post.slug} key={post.id}>
                  <PostCard data={post} handleChangePage={this.handleChangePage} calcTimeToRead={this.calcTimeToRead} type='excerpt' getCategoryNameFromId={this.getCategoryNameFromId} />
                </Link>)} />
              </div>
              <Route exact path="/:postName" render={({match}) => {
                const p = this.props.posts.find(post => post.slug === match.params.postName)
                if(p) {
                  return (
                    <Post data={p} handleChangePage={this.handleChangePage} calcTimeToRead={this.calcTimeToRead} type='solo'/>
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



const mapStateToProps = state => ({
  posts: state.blog.posts,
  categories: state.blog.categories,
  loading: state.blog.loading,
  error: state.blog.error
})

export default withRouter(connect(mapStateToProps)(Blog))
