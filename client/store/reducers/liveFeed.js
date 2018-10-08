import {iex} from '../../socket.js'

const initialState = {
  symbols: [],
  prices: {},
  lastPrices: {},
  historicalPrices: {},
  articles: [],
  symbol: '',
  quantity: 1,
  loading: false,
  styles: {}
}

const UPDATE_PRICE = 'UPDATE_PRICE'
const CLEAR_PRICES = 'CLEAR_PRICES'
const SET_SYMBOL = 'SET_SYMBOL'
const SET_QUANTITY = 'SET_QUANTITY'
const SET_STYLES = 'SET_STYLES'
const SET_STYLE = 'SET_STYLE'

export const setSymbol = symbol => {
  return {
    type: SET_SYMBOL,
    symbol
  }
}

export const setQuantity = quantity => {
  return {
    type: SET_QUANTITY,
    quantity
  }
}

export const clearPrices = () => {
  return {
    type: CLEAR_PRICES
  }
}

export const updatePrice = priceObj => {
  return {
    type: UPDATE_PRICE,
    priceObj
  }
}

export const setStyles = symbols => {
  return {
    type: SET_STYLES,
    symbols
  }
}

export const setStyle = (symbol, style) => {
  return {
    type: SET_STYLE,
    symbol,
    style
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRICE:
      const newPrices = {...state.prices}
      const historicalPrices = {...state.historicalPrices}
      if (historicalPrices[action.priceObj.symbol]) {
        if (historicalPrices[action.priceObj.symbol].length >= 10) {
          historicalPrices[action.priceObj.symbol] = [
            action.priceObj,
            ...historicalPrices[action.priceObj.symbol].slice(0, 9)
          ]
        } else {
          historicalPrices[action.priceObj.symbol] = [
            action.priceObj,
            ...historicalPrices[action.priceObj.symbol]
          ]
        }
      } else {
        historicalPrices[action.priceObj.symbol] = [action.priceObj]
      }
      newPrices[action.priceObj.symbol] = action.priceObj.lastSalePrice
      return {
        ...state,
        prices: newPrices,
        lastPrices: {...state.prices},
        historicalPrices: historicalPrices
      }
    case CLEAR_PRICES:
      const symbols = state.symbols.join(',')
      iex.emit('unsubscribe', symbols)
      return initialState
    case SET_SYMBOL:
      return {
        ...state,
        symbol: action.symbol.toUpperCase()
      }
    case SET_QUANTITY:
      return {
        ...state,
        quantity: Number(action.quantity)
      }
    case SET_STYLES:
      let styles = {}
      action.symbols.forEach(symbol => {
        styles[symbol.toUpperCase()] = '#656a6dcc'
      })
      return {
        ...state,
        styles
      }
    case SET_STYLE:
      let oldStyles = state.styles
      oldStyles[action.symbol] = action.style
      return {
        ...state,
        styles: oldStyles
      }
    default:
      return {...state}
  }
}

// {"symbol":"IBM","sector":"softwareservices","securityType":"commonstock","bidPrice":0.0000,"bidSize":0,"askPrice":153.2600,"askSize":100,"lastUpdated":1537976642843,"lastSalePrice":153.2600,"lastSaleSize":50,"lastSaleTime":1537976641795,"volume":95214,"marketPercent":0.03241,"seq":5100}
