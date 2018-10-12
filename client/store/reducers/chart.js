import axios from 'axios'

// const numberWithCommas = n => {
//   const parts = n.toString().split('.')
//   return (
//     parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
//     (parts[1] ? '.' + parts[1] : '')
//   )
// }

const GET_HISTORY = 'GET_HISTORY'
const GET_NEWS = 'GET_NEWS'
const GET_TICKER = 'GET_TICKER'
// const SET_PIE_VALUE = 'SET_PIE_VALUE'

const gotHistory = history => ({type: GET_HISTORY, history})
const gotTicker = companies => ({type: GET_TICKER, companies})
const gotNews = news => ({type: GET_NEWS, news})
// export const setPieValue = value => ({
//   type: SET_PIE_VALUE,
//   value: numberWithCommas(value.value),
//   name: value.name
// })

const defaultHistory = {
  history: {},
  news: {
    news: [],
    paprScore: 0
  },
  value: null,
  name: null
}

export const getNews = ticker => {
  return async dispatch => {
    try {
      console.log('getting news')
      const {data} = await axios.get(`/api/news/${ticker}`)
      dispatch(gotNews(data))
    } catch (err) {
      console.error(err)
    }
  }
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
    case GET_NEWS:
      return {...state, news: action.news}
    default:
      return state
  }
}
