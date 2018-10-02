import axios from 'axios'

const GET_PORTFOLIO = 'GET_PORTFOLIO'

const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})

const defaultPortfolio = {portfolio: {}}

export const fetchPortfolio = (userId, roomId) => {
  return async dispatch => {
    try {
      const portfolio = await axios.get(`/portfolio/${roomId}/${userId}`)
      dispatch(getPortfolio(portfolio.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return {...state, portfolio: action.portfolio}
    default:
      return state
  }
}
