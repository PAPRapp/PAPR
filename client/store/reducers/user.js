import axios from 'axios'
import fire from '../../firebase'
/**
 * ACTION TYPES
 */
const GOT_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const CURRENT_USER = 'CURRENT_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {
  currentUser: ''
}

/**
 * ACTION CREATORS
 */
const gotUser = user => ({type: GOT_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getCurrent = id => ({type: CURRENT_USER, id})

/**
 * THUNK CREATORS
 */
export const getUser = () => {
  return dispatch => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(gotUser(user))
      }
    })
  }
}

export const currentUser = email => {
  let useremail = email
  return async dispatch => {
    const userId = await axios.get(`/api/users?email=${useremail}`)
    console.log(userId)
    dispatch(getCurrent(userId.data.id))
  }
}

export const signOut = () => {
  return dispatch => {
    fire
      .auth()
      .signOut()
      .then(() => {
        dispatch(removeUser())
      })
  }
}

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GOT_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case CURRENT_USER:
      return {...state, currentUser: action.id}
    default:
      return state
  }
}
