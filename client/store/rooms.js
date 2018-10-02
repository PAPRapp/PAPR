import axios from 'axios'

const GET_ROOMS = "GET_ROOMS"

const gotRooms = (rooms) => ({type: GET_ROOMS, rooms})

const defaultRooms = []

export const getRooms = (userId) => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/rooms/${userId}`)
      dispatch(gotRooms(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = defaultRooms, action) {
  switch(action.type){
    case GET_ROOMS:
      return action.rooms
    default:
      return state
  }
}
