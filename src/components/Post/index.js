import React, { Component } from 'react'
import Gist from 'react-gist';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { calcTimeToRead } from '../Blog/common/blogHelpers'

class Post extends Component {
    render() {
        console.log('rendering!')
        const data = this.props.data
        const content = (this.props.type === 'excerpt') ? data.excerpt.rendered : data.content.rendered
        console.log(content)
        var splittedContent = content.split(/https:\/\/gist.github.com\/\d+/)
        var gists = content.match(/https:\/\/gist.github.com\/\d+/)
        console.log({splittedContent})
        console.log({gists})


        const type = (this.props.type === 'excerpt') ? 'excerpt' : 'single'
        const category = (data.categories.length > 0) ? this.props.categories.find(cat => cat.id === data.categories[0]) : ''
        const timeToRead = calcTimeToRead(data.content.rendered)
        const dateTime = this.calcDateTime(data.date)
        // const featuredImg = data.better_featured_image ? data.better_featured_image.source_url : ''
        this.combineArrays(splittedContent, gists)

        return (
            <div className="article" data-type={type}>
                <div className="article__inner">
                    <hgroup>
                        <h2>
                            <Link to={'/' + data.slug}>{data.title.rendered}</Link>
                        </h2>
                        <div className="article__bottom-details">
                            {
                                (category !== '') && <Link to={'/category/' + category.slug}>{category.name}</Link>
                            }
                            <span className="details__datetime">{dateTime}</span>
                            <span>{timeToRead} min read</span>
                        </div>
                    </hgroup>
                    {(type !== 'excerpt') &&
                        //<div className="article__content" dangerouslySetInnerHTML={{ __html: content }}></div>
                        <div className="article__content">
                            {this.combineArrays(splittedContent, gists)}
                        </div>
                    }
                </div>
            </div>
        )
    }

    getGistIdFromUrl = url => {
        return url.match(/\d+/)[0]
    }

    combineArrays = (array1, array2) => {
        let finalArray = []

        let longerArr
        let shorterArr 

        if(array1.length > array2.length) {
            longerArr = array1
            shorterArr = array2
        } else {
            longerArr = array2
            shorterArr = array1
        }

        for (var i = 0; i < longerArr.length; i++) {
            if(i % 2 === 0) {
                finalArray.push(<div dangerouslySetInnerHTML={{ __html: longerArr[i] }}></div>)
                shorterArr[i] && finalArray.push(<Gist id={this.getGistIdFromUrl(shorterArr[i])} /> ) 
            } else {
                shorterArr[i] && finalArray.push(<Gist id={this.getGistIdFromUrl(shorterArr[i])} /> ) 
                finalArray.push(<div dangerouslySetInnerHTML={{ __html: longerArr[i] }}></div>)
            }
        }

        console.log({finalArray})
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