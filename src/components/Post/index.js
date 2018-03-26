import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import htmlToText from "html-to-text"

class Post extends Component {
    render() {
        const data = this.props.data
        const content = (this.props.type === 'excerpt') ? data.excerpt.rendered : data.content.rendered
        const category = (data.categories.length > 0) ? this.props.categories.find(cat => cat.id === data.categories[0]) : ''
        const timeToRead = this.calcTimeToRead(data.content.rendered)
        const dateTime = this.calcDateTime(data.date)

        return (
            <div className="article">
                <div className="article__top-details">
                {
                    (category !== '') && <Link to={'/category/' + category.slug}>{category.name}</Link>
                }
                </div>
                <h2>
                <i className="emoji">{data.acf.emoji}</i>
                {/* <a onClick={this.props.handleChangePage.bind(null, data.slug)}>{data.title.rendered}</a> */}
                <Link to={'/' + data.slug}>{data.title.rendered}</Link>
                </h2>
                <div className="article__bottom-details">
                <a className="details__datetime">{dateTime}</a>
                <a>{timeToRead} min read</a>
                </div>
                <div className="article__content" dangerouslySetInnerHTML={{ __html: content}}> 
                </div>
            </div>
        )
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

    calcDateTime = t => {
        const date = new Date(t)
    
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        const now = new Date()
        if (now.getFullYear() ==! date.getFullYear()) {
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