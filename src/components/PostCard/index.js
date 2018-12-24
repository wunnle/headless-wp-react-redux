import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { calcTimeToRead } from '../Blog/common/blogHelpers'



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

  componentDidMount() {
    const bgUrl = this.props.data.featured_image.medium_large
    this.backgroundImageLoader(bgUrl)
  }

  render() {
    const {category: categories, post_date: date, slug, post_content: content, post_title: title} = this.props.data;
    const category = this.props.categories.find(cat => cat.id === categories[0]);

    console.log({date})

    const postDate = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    return (
    
    <Link to={`/${slug}`}>
    <div className="postCard" style={{
      background: this.state.bg
    }}>

      <div className="postCard__inner">
        <div className="postCard__cat">{category && category.name}</div>
        <h2>{title}</h2>
        <div>
          <span className="postCard__date">{postDate}</span>
          <span className="postCard__read-time">{calcTimeToRead(content)} min read</span>
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