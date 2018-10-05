import axios from 'axios'

const GET_HISTORY = 'GET_HISTORY'
const GET_TICKER = 'GET_TICKER'

const gotHistory = history => ({type: GET_HISTORY, history})
const gotTicker = companies => ({type: GET_TICKER, companies})

const defaultHistory = {
  history: {},
  companies: ['ibm']
}

export const getHistory = ticker => {
  let company = ticker
  return async dispatch => {
    try {
      const res = await axios.get(
        `https://api.iextrading.com/1.0/stock/${company}/chart/dynamic`
      )
      dispatch(gotHistory(res.data))
      return res
    } catch (err) {
      console.error(err)
    }
  }
}

export const getTicker = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/rooms/${id}`)
      console.log(res.data)
      dispatch(gotTicker(res.data.tickerQuery))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = defaultHistory, action) {
  switch (action.type) {
    case GET_HISTORY:
      return {...state, history: action.history}
    case GET_TICKER:
      return {...state, companies: action.companies}
    default:
      return state
  }
}
