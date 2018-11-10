import React from 'react';
import { connect } from 'react-redux'


const PostCard = props => {
  //console.log(props)
  const {
    better_featured_image:bgImg,
    categories,
    date,
    content: {
      rendered:content
    },
    title: {
      rendered:title
    }
  } = props.data;

  const bgUrl = bgImg && bgImg.source_url;
  const category = props.categories.find(cat => cat.id === categories[0])
  const postDate = new Date(date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
  return <div className="postCard" style={{
    backgroundImage: `url(${bgUrl})`
  }}>

      <div className="postCard__inner">
      <div className="postCard__cat">{category && category.name}</div>
      <h2>{title}</h2>
      <div>
        <span className="postCard__date">{postDate}</span>
        <span className="postCard__read-time">{props.calcTimeToRead(content)} min read</span>
      </div>
      </div>
  </div>;
};

const mapStateToProps = state => ({
  categories: state.blog.categories,
})

export default connect(mapStateToProps)(PostCard)  