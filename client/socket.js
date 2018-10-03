import io from 'socket.io-client'
import store from './store/index.js'
import {updatePrice} from './store/liveFeed'
//import store and action creators that you need

const socket = io(window.location.origin)
export const iex = io('https://ws-api.iextrading.com/1.0/tops')

const {room} = store.getState()

iex.on('connect', () => {
  console.log('connected')
})

iex.on('message', message => {
  console.log(message)
  const {symbol, lastSalePrice, lastSaleTime} = JSON.parse(message)
  store.dispatch(updatePrice({symbol, lastSalePrice, lastSaleTime}))
})

export default socket
