const router = require('express').Router()
const {Transaction, Portfolio} = require('../db/models')
module.exports = router

/* Utility function that gets the user's current holdings for that room and
returns it in an object ex. {IBM: 30, GE: 45, FB: 4} */
const getHoldings = async (userId, roomId, portfolioId) => {
  //Finds the porfolio that belongs to a particular user
  const portfolio = await Portfolio.findOne({
    where: {userId, roomId}
  })
  //Finds the transactions associated with that porfolio
  const transactions = await Transaction.findAll({
    where: {portfolioId}
  })
  //Initializes the holdings object that will be returned
  const holdings = {}
  //Attaches the user's cash to the holdings object (cash is a field in portfolio)
  holdings.cash = portfolio.cash
  //Maps over the transactions defined above
  transactions.forEach(element => {
    /*If the ticker does not currently exist on the holdings object, add it and either
    set the initial value to a negative or a positive dependent on whether or not the
    transaction was a sell order or a buy order*/
    if (!holdings[element.ticker]) {
      holdings[element.ticker] =
        element.type === 'buy' ? element.qty : -element.qty
    } else if (element.type === 'buy') {
      /*If the ticker exists, and the order is a buy, add the quantity to the
      value associated with that key*/
      holdings[element.ticker] += element.qty
    } else {
      /*If the ticker exists, and the order is a sell, subtract the quantity
      from the value associated with that key*/
      holdings[element.ticker] -= element.qty
    }
  })
  return holdings
}

const checkIfTransactionValid = (holdings, transactionRequest) => {
  if (transactionRequest.type === 'buy') {
    /*If you bought 5 shares of Company A at 100 the purchase price would be 500*/
    const purchasePrice = transactionRequest.qty * transactionRequest.price
    /*If the purchase price is greater than the user's cash balance canPurchase === false*/
    const canPurchase = purchasePrice <= holdings.cash
    return canPurchase
  } else if (transactionRequest.type === 'sell') {
    const sharesToSell = transactionRequest.qty
    const sharesOwned = holdings[transactionRequest.ticker] >= sharesToSell
    /*If the user owns 5 shares of company A and attemps to sell 6 shares of company B, canSell === false*/
    const canSell = transactionRequest.qty <= sharesOwned
    return canSell
  }
}

router.post('/', async (req, res, next) => {
  try {
    const {type, ticker, qty, price, portfolioId, userId, roomId} = req.body
    //Get user's holdings
    const holdings = await getHoldings(userId, roomId, portfolioId)
    //Check to see if they have enough cash to purchase or shares to sell
    const validTransaction = checkIfTransactionValid(holdings, req.body)
    if (validTransaction) {
      //If the user does have enough cash or shares to perform their transaction, register to DB
      await Transaction.create({
        type,
        ticker,
        qty,
        price,
        portfolioId
      })
      const successfulTransactionResponse = {
        message: 'Transaction confirmed'
      }
      //Send success message
      res.json(successfulTransactionResponse)
    } else {
      //If the user does not have enough cash or shares to perform their transaction, send error message
      const failedTransactionResponse = {
        message: 'Transaction failed due to inadequate holdings'
      }
      res.json(failedTransactionResponse)
    }
  } catch (err) {
    next(err)
  }
})
