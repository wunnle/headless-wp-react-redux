import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'



class PostCard extends Component {
  state = { bg: '#EEECEC'}

  backgroundImageLoader = (bgUrl) => {
    const img = new Image()
    img.src = bgUrl  
    img.onload = () => {
      this.setState({
        bg: `url(${bgUrl})`
      })
    }
  }

  render() {
    const {better_featured_image: bgImg, categories, date, slug, content: {rendered: content}, title: {rendered: title}} = this.props.data;
    const bgUrl = bgImg && bgImg.source_url;
    const category = this.props.categories.find(cat => cat.id === categories[0]);
    const postDate = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    this.backgroundImageLoader(bgUrl)
    return (
    
    <Link to={slug}>
    <div className="postCard" style={{
      background: this.state.bg
    }}>

      <div className="postCard__inner">
        <div className="postCard__cat">{category && category.name}</div>
        <h2>{title}</h2>
        <div>
          <span className="postCard__date">{postDate}</span>
          <span className="postCard__read-time">{this.props.calcTimeToRead(content)} min read</span>
        </div>
      </div>
    </div>
    </Link>
    )}
}

const mapStateToProps = state => ({
  categories: state.blog.categories,
})

export default connect(mapStateToProps)(PostCard)  