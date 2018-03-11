import React, { Component } from 'react'

class Article extends Component {
    render() {
        return (
            <div className="article">
                <div className="article__top-details">
                {/* <Link to={`${process.env.PUBLIC_URL}/${article.acf.category}`}>{article.acf.category}</Link> */}
                <a>general</a>
                </div>
                {/* <h2 onClick={this.openAnimation.bind(this)}> */}
                <h2>

                <i className="emoji">✌</i>
                {/* <Link to={`${process.env.PUBLIC_URL}/${article.slug}`}>
                    {article.title.rendered}
                </Link> */}
                <a>This is article title</a>
                </h2>
                <div className="article__bottom-details">
                <a className="details__datetime">2 days ago</a>
                <a>5 minute read</a>
                </div>
                <div className="article__content"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum dolor at interdum molestie. Mauris vestibulum risus libero, in fringilla augue pulvinar ullamcorper. Phasellus eleifend faucibus orci id tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam tempor dui a enim eleifend, vel sagittis justo rhoncus. Ut at luctus ligula. Pellentesque consectetur eget purus in feugiat. 
                </div>
            </div>
        )
    }
}

export default Article