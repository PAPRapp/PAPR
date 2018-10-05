import axios from 'axios'

const POST_TRANSACTION = 'POST_TRANSACTION'

const postTransaction = transactionResponse => {
  return {
    type: POST_TRANSACTION,
    transactionResponse
  }
}

const defaultStore = {
  message: ''
}

export const createTransaction = transaction => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/transaction', transaction)
      dispatch(postTransaction(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default (state = defaultStore, action) => {
  switch (action.type) {
    case POST_TRANSACTION:
      return {...action.transactionResponse}
    default:
      return state
  }
}
