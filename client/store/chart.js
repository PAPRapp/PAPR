import axios from 'axios'

const GET_HISTORY = 'GET_HISTORY'

const gottHistory = history => ({type: GET_HISTORY, history})

const defaultHistory = {
  history:{},
  companies:['ibm','appl','tsla'],
}

export const getHistory = (ticker) => {
  let company = ticker
  console.log("this is the store comapny:", company)
  return async dispatch => {
    try {
      const res = await axios.get(
        `https://api.iextrading.com/1.0/stock/${company}/chart/dynamic`
      )
      dispatch(gottHistory(res.data))
      return res
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = defaultHistory, action) {
  switch (action.type) {
    case GET_HISTORY:
      return {...state, history: action.history}
    default:
      return state
  }
}
