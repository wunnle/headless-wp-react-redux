import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import blogReducer from './blog'

export default combineReducers({
  routing: routerReducer,
  blogReducer
})