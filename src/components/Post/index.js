import React, { Component } from 'react'
import Gist from 'super-react-gist';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { calcTimeToRead } from '../Blog/common/blogHelpers'
import Seo from '../Seo'
import MeCard from './MeCard'

class Post extends Component {
    render() {
        const data = this.props.data
        const rendered = data.content.rendered
        const excerpt = data.excerpt.rendered
        const gistRegex = /https:\/\/gist.github.com\/wunnle\/\w*/g
        const content = rendered.match(gistRegex)
            ? this.combineArrays(rendered.split(gistRegex), rendered.match(gistRegex))
            : <div dangerouslySetInnerHTML={{ __html: rendered }}></div>

        const type = (this.props.type === 'excerpt') ? 'excerpt' : 'single'
        const category = (data.categories.length > 0) ? this.props.categories.find(cat => cat.id === data.categories[0]) : ''
        const timeToRead = calcTimeToRead(data.content.rendered)
        const dateTime = this.calcDateTime(data.date)
        const featuredImage = this.props.data.better_featured_image.source_url

        console.log('posts, initially', this.props.posts)
        const description = this.strip(excerpt).substring(0, 100)
        const url = `http://blog.wunnle.com/${data.slug}`

        console.log({featuredImage})

        return (
            <div className="article" data-type={type}>
                <Seo
                    title={data.title.rendered}
                    description={description}
                    path={data.slug}
                    image={featuredImage}
                 />
                <div className="article__inner">
                    <MeCard date={dateTime} />
                    <hgroup>
                        <h1>
                            <Link to={'/' + data.slug}>{data.title.rendered}</Link>
                        </h1>
                        <div className="article__bottom-details">
                            {/* <span className="details__datetime"></span> */}
                            {category !== '' && <Link to={'/category/' + category.slug}>{category.name}</Link>}
                            <span>{timeToRead} min read</span>
                        </div>
                    </hgroup>
                    {(type !== 'excerpt') &&
                        //<div className="article__content" dangerouslySetInnerHTML={{ __html: content }}></div>
                        <div className="article__content">
                            {content}
                        </div>
                    }
                </div>
            </div>
        )
    }

    getGistIdFromUrl = url => {
        console.log(url.match(/https:\/\/gist.github.com\/wunnle\/(.*)/))
        return url.match(/https:\/\/gist.github.com\/wunnle\/(\w*)/)[1]
    }

    combineArrays = (array1, array2) => {
        let finalArray = []
        let longerArr
        let shorterArr

        if (array1.length > array2.length) {
            longerArr = array1
            shorterArr = array2
        } else {
            longerArr = array2
            shorterArr = array1
        }

        for (var i = 0; i < longerArr.length; i++) {
            finalArray.push(<div key={`${i}${i + 1}`} dangerouslySetInnerHTML={{ __html: longerArr[i] }}></div>)
            shorterArr[i] && finalArray.push(<Gist key={`${i}${i + 2}`} url={shorterArr[i]} />)
        }

        return finalArray
    }

    calcDateTime = t => {
        const date = new Date(t)

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        const now = new Date()
        if (now.getFullYear() !== date.getFullYear()) {
            return months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear()
        }

        if (now.toDateString() === date.toDateString()) {
            if (date.getHours() > now.getHours()) {
                return date.getHours() - now.getHours() + ' hours ago'
            } else {
                return 'just now'
            }
        }

        if (now.getFullYear() === date.getFullYear()) {
            return months[date.getMonth()] + ' ' + date.getDate()
        }
    }

    strip = (html) => {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    }
}

Post.defaultProps = {
    title: 'This is article title',
    content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum dolor at interdum molestie. Mauris vestibulum risus libero, in fringilla augue pulvinar ullamcorper. Phasellus eleifend faucibus orci id tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam tempor dui a enim eleifend, vel sagittis justo rhoncus. Ut at luctus ligula. Pellentesque consectetur eget purus in feugiat.</p> '
}

const mapStateToProps = state => ({
    posts: state.blog.posts,
    categories: state.blog.categories,
    error: state.blog.error
})

export default connect(mapStateToProps)(Post)