import axios from 'axios'

 const GET_ROOM_DATA = 'GET_ROOM_DATA'

 const gotRoomData = (roomData) => ({type:GET_ROOM_DATA, roomData })

 const defaultRoom = {}

 export const getRoomData = (content) => {
  console.log(content)
  return async dispatch => {
    try {
      const res = await axios.post(
        `/api/rooms/room`, content
      )
      console.log(res.data)
      dispatch(gotRoomData(res.data))
      return res
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = defaultRoom, action) {
  switch (action.type) {
    case GET_ROOM_DATA:
      return action.roomData
    default:
      return state
  }
}
