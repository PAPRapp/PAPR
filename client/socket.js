import io from 'socket.io-client'
import store from './store/index.js'
import {updatePrice} from './store/liveFeed'
//import store and action creators that you need

const socket = io(window.location.origin)
const iex = io('https://ws-api.iextrading.com/1.0/tops')
const iexOfficialPrices = io('https://ws-api.iextrading.com/1.0/deep')

const {liveFeed} = store.getState()

iex.on('connect', () => {
  console.log('connected')
  const symbols = liveFeed.symbols.join(',')
  iex.emit('subscribe', symbols)
})

// iexOfficialPrices.on('connect', () => {
//   console.log('connected')
//   iexOfficialPrices.emit(
//     'subscribe',
//     JSON.stringify({
//       symbols: liveFeed.symbols,
//       channels: ['officialprice']
//     })
//   )
// })

// iexOfficialPrices.on('message', message => {
//   console.log(message)
// })

iex.on('message', message => {
  console.log(message)
  const {symbol, lastSalePrice, lastSaleTime} = JSON.parse(message)
  store.dispatch(updatePrice({symbol, lastSalePrice, lastSaleTime}))
})

export default socket
