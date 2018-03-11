import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Article from '../Article'
import "../../css/style.css"

class Blog extends Component {
  render() {
    return (
      <div className="App">
        <div className="content">
          <div className="container">
            <Header/>
            <Route exact path="/" component={Articles} />
            <Route exact path="/article" component={Article} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const Articles = (props) => (
  <div>
    <Article />
    <Article />
  </div>
)

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

export default Blog;
