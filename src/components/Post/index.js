import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Post extends Component {
    render() {
        const data = this.props.data
        const content = (this.props.type === 'excerpt') ? data.excerpt.rendered : data.content.rendered
        console.log(content)
        const type = (this.props.type === 'excerpt') ? 'excerpt' : 'single'
        const category = (data.categories.length > 0) ? this.props.categories.find(cat => cat.id === data.categories[0]) : ''
        const timeToRead = this.props.calcTimeToRead(data.content.rendered)
        const dateTime = this.calcDateTime(data.date)
        const featuredImg = data.better_featured_image ? data.better_featured_image.source_url : ''

        return (
            <div className="article" data-type={type}>
                <div className="article__inner">
                    <hgroup>
                        <div className="article__top-details">
                            {
                                (category !== '') && <Link to={'/category/' + category.slug}>{category.name}</Link>
                            }
                        </div>
                        <h2>
                            <Link to={'/' + data.slug}>{data.title.rendered}</Link>
                        </h2>
                        <div className="article__bottom-details">
                            <span className="details__datetime">{dateTime}</span>
                            <span>{timeToRead} min read</span>
                        </div>
                    </hgroup>
                    {(type !== 'excerpt') &&
                        <div className="article__content" dangerouslySetInnerHTML={{ __html: content }}></div>
                    }      
                </div>         
            </div>
        )
    }

    calcDateTime = t => {
        const date = new Date(t)
    
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        const now = new Date()
        if (now.getFullYear() !== date.getFullYear()) {
          return months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear()
        }

        if(now.toDateString() === date.toDateString()) {
            if(date.getHours() > now.getHours()) {
                return date.getHours() - now.getHours() + ' hours ago' 
            } else {
                return 'just now'
            }
        }

        if(now.getFullYear() === date.getFullYear()) {
            return months[date.getMonth()] + ' ' + date.getDate()
        }
    }
}

Post.defaultProps = {
    title: 'This is article title',
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum dolor at interdum molestie. Mauris vestibulum risus libero, in fringilla augue pulvinar ullamcorper. Phasellus eleifend faucibus orci id tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam tempor dui a enim eleifend, vel sagittis justo rhoncus. Ut at luctus ligula. Pellentesque consectetur eget purus in feugiat.</p> '
}

const mapStateToProps = state => ({
    posts: state.blog.posts,
    categories: state.blog.categories,
    loading: state.blog.loading,
    error: state.blog.error
  })
  
export default connect(mapStateToProps)(Post)