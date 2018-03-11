import React, { Component } from 'react'
import Article from '../Article'
import "../../css/style.css"

class Main extends Component {
  render() {
    return (
      <div className="App">
        <div className="ruler"></div>
        <div className="content">
          <div className="container">
            <Header/>
            <Article />
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
    <i className="papership" />
    <h1 onClick={props.handleHomeClick}>
      {/* <Link>blog</Link> */}
    </h1>
  </header>
);

export default Main;
