import axios from 'axios'
import socket from '../../socket'

const initialState = {
  messages: [],
  newMessageEntry: ''
}

const GET_MESSAGE = 'GET_MESSAGE'
const GET_MESSAGES = 'GET_MESSAGES'
const WRITE_MESSAGE = 'WRITE_MESSAGE'

export const getMessage = message => {
  return {type: GET_MESSAGE, message}
}

export const getMessages = messages => {
  return {type: GET_MESSAGES, messages}
}

export const writeMessage = content => {
  return {type: WRITE_MESSAGE, content}
}

export const fetchMessages = roomId => {
  return async dispatch => {
    const response = await axios.get(`/api/message/${roomId}`)
    const messages = response.data
    const action = getMessages(messages)
    dispatch(action)
  }
}

export const postMessage = (roomId, userId, content) => {
  return async dispatch => {
    console.log(content)
    const response = await axios.post(`/api/message/${roomId}/${userId}`, {
      content
    })
    const {username} = response.data
    const action = getMessage({username, content})
    dispatch(action)
    socket.emit('new-message', {username, content})
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.messages
      }

    case GET_MESSAGE:
      return {
        ...state,
        newMessageEntry: '',
        messages: [...state.messages, action.message]
      }

    case WRITE_MESSAGE:
      return {
        ...state,
        newMessageEntry: action.content
      }

    default:
      return state
  }
}
