import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';


class Post extends Component {
    render() {
        const data = this.props.data
        const content = (this.props.type === 'excerpt') ? data.excerpt.rendered : data.content.rendered
        return (
            <div className="article">
                <div className="article__top-details">
                {/* <Link to={`${process.env.PUBLIC_URL}/${article.acf.category}`}>{article.acf.category}</Link> */}
                <a>{data.acf.category}</a>
                </div>
                <h2>
                <i className="emoji">{data.acf.emoji}</i>
                <a onClick={this.props.handleChangePage.bind(null, data.slug)}>{data.title.rendered}</a>
                {/* <Link to={data.slug}>
                    {data.title.rendered}
                </Link> */}
                </h2>
                <div className="article__bottom-details">
                <a className="details__datetime">2 days ago</a>
                <a>5 minute read</a>
                </div>
                <div className="article__content" dangerouslySetInnerHTML={{ __html: content}}> 
                </div>
            </div>
        )
    }
}

Post.defaultProps = {
    title: 'This is article title',
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum dolor at interdum molestie. Mauris vestibulum risus libero, in fringilla augue pulvinar ullamcorper. Phasellus eleifend faucibus orci id tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam tempor dui a enim eleifend, vel sagittis justo rhoncus. Ut at luctus ligula. Pellentesque consectetur eget purus in feugiat.</p> '
}

export default Post