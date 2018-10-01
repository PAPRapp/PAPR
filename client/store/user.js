import axios from 'axios'
import history from '../history'
import fire from '../firebase'
/**
 * ACTION TYPES
 */
const GOT_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = null

/**
 * ACTION CREATORS
 */
const gotUser = user => ({type: GOT_USER, user})
const removeUser = () => ({type: REMOVE_USER})

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

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(gotUser({error: authError}))
  }

  try {
    dispatch(gotUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

// export const logout = () => async dispatch => {
//   try {
//     await axios.post('/auth/logout')
//     dispatch(removeUser())
//     history.push('/login')
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GOT_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
