// import axios from 'axios'

// const GET_PORTFOLIO = 'GET_PORTFOLIO'
// const PUT_PORTFOLIO = 'PUT_PORTFOLIO'
// const SET_HOLDINGS = 'SET_HOLDINGS'

// const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})
// const putPortfolio = portfolio => ({type: PUT_PORTFOLIO, portfolio})

// const defaultPortfolio = {portfolio: {}, holdings: {}}

// export const setHoldings = holdings => {
//   return {
//     type: SET_HOLDINGS,
//     holdings
//   }
// }

// export const fetchPortfolio = (roomId, userId) => {
//   return async dispatch => {
//     try {
//       const portfolio = await axios.get(`/api/portfolio/${roomId}/${userId}`)
//       dispatch(getPortfolio(portfolio.data))
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

// export const updatePortfolio = (roomId, userId, state) => {
//   return async dispatch => {
//     try {
//       const portfolio = await axios.put(
//         `api/portfolio/${roomId}/${userId}`,
//         state
//       )
//       dispatch(putPortfolio(portfolio.data))
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

// export default function(state = defaultPortfolio, action) {
//   switch (action.type) {
//     case GET_PORTFOLIO:
//       return {...state, portfolio: action.portfolio}
//     case PUT_PORTFOLIO:
//       return {...state, portfolio: action.portfolio}
//     case SET_HOLDINGS:
//       return {...state, holdings: action.holdings}
//     default:
//       return state
//   }
// }

import axios from 'axios'
//import {realpathSync} from 'fs'

const GET_PORTFOLIO = 'GET_PORTFOLIO'
const PUT_PORTFOLIO = 'PUT_PORTFOLIO'
const SET_HOLDINGS = 'SET_HOLDINGS'
const GET_ALL_PORTFOLIOS = 'GET_ALL_PORTFOLIOS'

const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})
const putPortfolio = portfolio => ({type: PUT_PORTFOLIO, portfolio})
const getAllPortfolios = portfolios => ({type: GET_ALL_PORTFOLIOS, portfolios})

const defaultPortfolio = {portfolio: {}, holdings: {}, portfolios: []}

export const fetchAllPortfolios = roomId => {
  return async dispatch => {
    try {
      const portfolios = await axios.get(`/api/portfolio/${roomId}`)
      dispatch(getAllPortfolios(portfolios.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const setHoldings = holdings => {
  return {
    type: SET_HOLDINGS,
    holdings
  }
}

export const fetchPortfolio = (roomId, userId) => {
  return async dispatch => {
    try {
      const portfolio = await axios.get(`/api/portfolio/${roomId}/${userId}`)
      dispatch(getPortfolio(portfolio.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updatePortfolio = (roomId, userId, state) => {
  return async dispatch => {
    try {
      const portfolio = await axios.put(
        `api/portfolio/${roomId}/${userId}`,
        state
      )
      dispatch(putPortfolio(portfolio.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return {...state, portfolio: action.portfolio}
    case GET_ALL_PORTFOLIOS:
      return {...state, portfolios: action.portfolios}
    case PUT_PORTFOLIO:
      return {...state, portfolio: action.portfolio}
    case SET_HOLDINGS:
      return {...state, holdings: action.holdings}
    default:
      return state
  }
}
