import axios from 'axios'

const GET_ROOMS = "GET_ROOMS"

const gotRooms = (rooms) => ({type: GET_ROOMS, rooms})

const defaultRooms = {
  id:[],
  name:[],
  active: [],
}

export const getRooms = (userId) => {
  let id = userId
  return async dispatch => {
    try {
      const res = await axios.get(`/rooms/${id}`)
      dispatch(gotRooms(res.data))
    } catch (error) {
      console.error(err)
    }
  }
}

export default function(state = defaultRooms, action) {
  switch(action.type){
    case GET_ROOMS:
      return {...state, id: action.map(data => data.id), name: action.map(data => data.name), active: action.map(data => data.active) }
  }
}
