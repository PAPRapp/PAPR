import axios from 'axios'

const SET_HASH = 'SET_HASH'
const CLEAR_HASH = 'CLEAR_HASH'

export const setHash = hash => {
  return {
    type: SET_HASH,
    hash
  }
}

export const clearHash = () => {
  return {
    type: CLEAR_HASH
  }
}

export const joinRoom = (hash, userId) => {
  return async dispatch => {
    try {
      await axios.put(`/api/rooms/join/${hash}`, {userId})
      dispatch(clearHash())
    } catch (err) {
      console.log(err)
    }
  }
}

const defaultState = null

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_HASH:
      return action.hash
    case CLEAR_HASH:
      return null
    default:
      return state
  }
}
