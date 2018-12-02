import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Post from '../Post'
import PostCard from '../PostCard'
import '../../css/style.scss'
import { connect } from 'react-redux'
import { fetchAllPosts, fetchCategories, changePage } from "../../actions/blog"
import htmlToText from "html-to-text"
import { Header } from './Header';
import { LoadingCards } from './LoadingCards';


class Blog extends Component {
  componentDidMount() {
    console.log('componentDidMount!')
    this.props.dispatch(fetchAllPosts())
    this.props.dispatch(fetchCategories())
  }

  handleChangePage = slug => {
    console.log('handleChangePage')
    this.props.dispatch(changePage(slug))
  }

  getCategoryNameFromId = categoryId => {
    this.props.categories.forEach(cat => {
      if (categoryId === cat.id) {
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
    if (this.props.error) {
      return <div>something went wrong</div>
    }

    return (
      <div className="blog">
        <div className="content">
          <Header />
          <div className="container">
            <Route exact path="/" render={() =>
              <>
                <p className="blog-description">A blog about front-end development, design and maybe some short stories.</p>
                <div className="articles">
                  {
                    this.props.loading ? <LoadingCards /> :
                    this.props.posts.map(post =>   
                    <PostCard key={post.id} data={post} handleChangePage={this.handleChangePage} calcTimeToRead={this.calcTimeToRead} getCategoryNameFromId={this.getCategoryNameFromId} />)
                  }
                </div>
              </>
            } />
            <Route exact path="/:postName" render={({ match }) => {
              const p = this.props.posts.find(post => post.slug === match.params.postName)
              if(this.props.loading) {
                return 'loading'
              } else if(p) {
                return (
                  <Post data={p} handleChangePage={this.handleChangePage} calcTimeToRead={this.calcTimeToRead} type='solo' />
                )
              } else {
                return ('404')
              }
            }
            } />
            <Route exact path="/category/:categoryName" render={({ match }) => {
                if(this.props.categories && this.props.categories.length > 0) {
                  const category = this.props.categories.find(category => category.slug === match.params.categoryName)
                  const { id, name } = category
                  return (
                    <>
                    <h2>Posts in {name}</h2>
                    <div className="articles">
                    {this.props.posts.filter(post => post.categories[0] === id)
                      .map(post => <PostCard data={post} handleChangePage={this.handleChangePage} calcTimeToRead={this.calcTimeToRead} key={post.id} type='excerpt' />)}
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
