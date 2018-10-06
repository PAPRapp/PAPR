import axios from 'axios'

const GET_ROOM_DATA = 'GET_ROOM_DATA'
const SET_TICKER = 'SET_TICKER'

export const gotRoomData = (currentRoom, portfolio) => ({
  type: GET_ROOM_DATA,
  currentRoom,
  portfolio
})

export const setTicker = ticker => ({
  type: SET_TICKER,
  ticker
})

const defaultRoom = {
  currentRoom: {},
  portfolio: {},
  ticker: '',
  type: ''
}

export const getRoomData = (userId, roomId) => {
  return async dispatch => {
    try {
      console.log(userId, roomId)
      const res = await axios.post(`/api/rooms/room`, {userId, roomId})
      console.log(res.data)
      dispatch(gotRoomData(res.data, res.data.portfolios[0]))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = defaultRoom, action) {
  switch (action.type) {
    case GET_ROOM_DATA:
      return {
        ...state,
        currentRoom: action.currentRoom,
        portfolio: action.portfolio
      }
    case SET_TICKER:
      return {...state, ticker: action.ticker}
    default:
      return state
  }
}
