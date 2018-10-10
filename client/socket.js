import io from 'socket.io-client'
import store, {updatePrice, getMessage} from './store/'

const socket = io(window.location.origin)
export const iex = io('https://ws-api.iextrading.com/1.0/tops')

socket.on('connect', () => {
  socket.on('new-message', message => {
    store.dispatch(getMessage(message))
  })
})
iex.on('connect', () => {
  console.log('connected')
})

iex.on('message', message => {
  const {symbol, lastSalePrice, lastSaleTime} = JSON.parse(message)
  store.dispatch(updatePrice({symbol, lastSalePrice, lastSaleTime}))
})

export default socket
