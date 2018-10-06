import axios from 'axios'

const GET_ROOMS = 'GET_ROOMS'
const POST_ROOM = 'POST_ROOM'

const gotRooms = rooms => ({type: GET_ROOMS, rooms})
const postedRoom = slug => ({type: POST_ROOM, slug})

const defaultRooms = {
  rooms: [],
  slug: ''
}

export const getRooms = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/rooms/${userId}`)
      dispatch(gotRooms(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const postRoom = data => {
  let content = data
  console.log(content)
  return async dispatch => {
    try {
      const res = await axios.post('/api/rooms/create', content)
      console.log(res.data)
      dispatch(postedRoom(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default (state = defaultRooms, action) => {
  switch (action.type) {
    case GET_ROOMS:
      return {...state, rooms: action.rooms}
    case POST_ROOM:
      return {...state, slug: action.slug}
    default:
      return state
  }
}
