import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import Post from '../Post'
import PostCard from '../PostCard'
import LoadingCard from '../LoadingCard'
import '../../css/style.scss'
import logo from '../../img/papership.svg';
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
                    this.props.loading ?
                      <>
                        <LoadingCard animationDelay='0s' />
                        <LoadingCard animationDelay='0.2s' />
                        <LoadingCard animationDelay='0.4s' />
                        <LoadingCard animationDelay='0.6s' />
                        <LoadingCard animationDelay='0.8s' />
                        <LoadingCard animationDelay='1s' />
                        <LoadingCard animationDelay='2s' />
                        <LoadingCard />
                        <LoadingCard />
                      </>
                      :
                      this.props.posts.map(post => <Link to={post.slug} key={post.id}>
                        <PostCard data={post} handleChangePage={this.handleChangePage} calcTimeToRead={this.calcTimeToRead} type='excerpt' getCategoryNameFromId={this.getCategoryNameFromId} />
                      </Link>)
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
                {console.log(this.props)}
                return ('404')
              }
            }
            } />
            <Route exact path="/category/:categoryName" render={({ match }) => {
              const categoryID = this.props.categories.find(category => category.slug === match.params.categoryName).id
              return (
                this.props.posts.filter(post => post.categories[0] === categoryID)
                  .map(post => <Post data={post} handleChangePage={this.handleChangePage} key={post.id} type='excerpt' />)
              )
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

const Header = (props) => (
  <header>
      {<Link to="/"><img src={logo} width="70px" alt=""/> </Link>}
  </header>
);



const mapStateToProps = state => ({
  posts: state.blog.posts,
  categories: state.blog.categories,
  loading: state.blog.loading,
  error: state.blog.error
})

export default withRouter(connect(mapStateToProps)(Blog))
