import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import '../../css/style.scss'
import { connect } from 'react-redux'
import { Header } from './common/Header';
import { Footer } from './common/Footer';
import Routes from './Routes'

class Blog extends Component {

  getCategoryNameFromId = categoryId => {
    this.props.categories.forEach(cat => {
      if (categoryId === cat.id) {
        return cat.name
      }
    })
  }

  render() {
    if (this.props.error) {
      return <div>something went wrong</div>
    }

    return (
      <div className="blog">
        <div className="content">
          <Header />
          <Routes />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.blog.categories,
})

export default withRouter(connect(mapStateToProps)(Blog))
