import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './reducers/user'
import chart from './reducers/chart'
import rooms from './reducers/rooms'
import liveFeed from './reducers/liveFeed'
import portfolio from './reducers/portfolio'
import room from './reducers/room'
import sectors from './reducers/sectors'
import currentPage from './reducers/currentPage'
import transaction from './reducers/transaction'

const reducer = combineReducers({
  user,
  chart,
  rooms,
  liveFeed,
  portfolio,
  room,
  sectors,
  currentPage,
  transaction
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './reducers/user'
export * from './reducers/chart'
export * from './reducers/rooms'
export * from './reducers/liveFeed'
export * from './reducers/portfolio'
export * from './reducers/room'
export * from './reducers/sectors'
export * from './reducers/currentPage'
export * from './reducers/transaction'
