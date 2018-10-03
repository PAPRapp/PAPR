import axios from 'axios'

const GET_PORTFOLIO = 'GET_PORTFOLIO'
const PUT_PORTFOLIO = 'PUT_PORTFOLIO'

const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})
const putPortfolio = portfolio => ({type: PUT_PORTFOLIO, portfolio})

const defaultPortfolio = {portfolio: {}}

export const fetchPortfolio = (roomId, userId) => {
  return async dispatch => {
    try {
      const portfolio = await axios.get(`/portfolio/${roomId}/${userId}`)
      dispatch(getPortfolio(portfolio.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updatePortfolio = (roomId, userId, state) => {
  return async dispatch => {
    try {
      const portfolio = await axios.put(`/portfolio/${roomId}/${userId}`, state)
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
    case PUT_PORTFOLIO:
      return {...state, portfolio: action.portfolio}
    default:
      return state
  }
}
