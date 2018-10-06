import axios from 'axios'
import portfolio from './portfolio'

const POST_TRANSACTION = 'POST_TRANSACTION'
const SET_TRANSACTIONS = 'SET_TRANSACTIONS'

const postTransaction = transactionResponse => {
  return {
    type: POST_TRANSACTION,
    transactionResponse
  }
}

const setTransactions = transactions => {
  return {
    type: SET_TRANSACTIONS,
    transactions
  }
}

const defaultStore = {
  message: '',
  transactions: []
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
export const getTransactions = portfolioId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/transaction/${portfolioId}`)
      dispatch(setTransactions(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default (state = defaultStore, action) => {
  switch (action.type) {
    case POST_TRANSACTION:
      return {...state, message: action.transactionResponse.message}
    case SET_TRANSACTIONS:
      return {...state, transactions: action.transactions}
    default:
      return state
  }
}
