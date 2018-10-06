import axios from 'axios'
import fire from '../../firebase'

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
      await fire
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(async idToken => {
          console.log(idToken)
          const payload = {
            userId,
            idToken
          }
          const res = await axios.post(`/api/rooms/`, payload)
          dispatch(gotRooms(res.data))
        })
        .catch(function(error) {
          console.log(error)
        })
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
