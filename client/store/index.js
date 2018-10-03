import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import chart from './chart'
import rooms from './rooms'
import liveFeed from './liveFeed'
import portfolio from './portfolio'
import room from './room'
import sectors from './sectors'

const reducer = combineReducers({user, chart, rooms, liveFeed, portfolio, room, sectors})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
