
import React from 'react';
import { Route } from 'react-router-dom'
import Home from './Home'
import SinglePost from './SinglePost'
import Categories from './Categories'

export const Routes = () => (
  <div className="container">
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/:postName" component={SinglePost}></Route>
    <Route exact path="/category/:categoryName" component={Categories}></Route>
  </div>
)

export default Routes