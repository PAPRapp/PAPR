const initialState = 'landing'

const SET_PAGE = 'SET_PAGE'

export const setPage = page => {
  return {
    type: SET_PAGE,
    page
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return action.page
    default:
      return state
  }
}
