import axios from 'axios'

const POST_TRANSACTION = 'POST_TRANSACTION'

const postTransaction = () => ({type: POST_TRANSACTION})

const defaultStore = {transactions: {}}

export const createTransaction = state => {
  return async dispatch => {
    try {
      const transaction = await axios.post('/api/transaction', state)
      dispatch(postTransaction(transaction.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = defaultStore, action) {
  switch (action.type) {
    case POST_TRANSACTION:
      return {...state}
    default:
      return state
  }
}
