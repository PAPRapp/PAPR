const initialState = {
  symbols: [],
  prices: {},
  lastPrices: {},
  historicalPrices: {},
  articles: [],
  symbol: '',
  quantity,
  loading: false
}

const UPDATE_PRICE = 'UPDATE_PRICE'
const CLEAR_PRICES = 'CLEAR_PRICES'
const SET_SYMBOL = 'SET_SYMBOL'
const SET_QUANTITY = 'SET_QUANTITY'

export const setSymbol = symbol => {
  return {
    type: SET_SYMBOL,
    symbol
  }
}

export const setQuantity = quantity => {
  return {
    type: SET_SYMBOL,
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
      return initialState
    case SET_SYMBOL:
      return {
        ...state,
        symbol: action.symbol
      }
    case SET_QUANTITY:
      return {
        ...state,
        quantity: action.quantity
      }
    default:
      return {...state}
  }
}

// {"symbol":"IBM","sector":"softwareservices","securityType":"commonstock","bidPrice":0.0000,"bidSize":0,"askPrice":153.2600,"askSize":100,"lastUpdated":1537976642843,"lastSalePrice":153.2600,"lastSaleSize":50,"lastSaleTime":1537976641795,"volume":95214,"marketPercent":0.03241,"seq":5100}
