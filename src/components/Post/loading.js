import React, { Component } from 'react'
import PlaceholderText from '../Blog/common/PlaceholderText'

import MeCard from './MeCard'

class Post extends Component {
    render() {
        return (
            <div className="article" >
                <div className="article__inner">
                    <MeCard />
                    <hgroup>
                        <h1>
                        <PlaceholderText length={7}/>
                        </h1>
                        <div className="article__bottom-details">
                            <span><PlaceholderText length={5} count={2} dark={true}/></span>
                        </div>
                    </hgroup>
                    <div className="article__content">
                        <PlaceholderText length={28} count={20}/>
                    </div>
                </div>
            </div>
        )
    }
}



export default Post