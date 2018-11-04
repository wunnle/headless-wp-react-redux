import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import blog from './blog'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  blog
})

export default rootReducer