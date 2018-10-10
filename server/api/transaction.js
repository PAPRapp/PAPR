const router = require('express').Router()
const {Transaction, Portfolio} = require('../db/models')
module.exports = router

const checkIfTransactionValid = (holdings, transactionRequest) => {
  if (transactionRequest.type === 'buy') {
    /*If you bought 5 shares of Company A at 100 the purchase price would be 500*/
    const purchasePrice = transactionRequest.qty * transactionRequest.price
    /*If the purchase price is greater than the user's cash balance canPurchase === false*/
    const canPurchase =
      purchasePrice <= holdings.Cash &&
      transactionRequest.qty > 0 &&
      transactionRequest.qty < 100000000
    return canPurchase
  } else if (transactionRequest.type === 'sell') {
    const sharesToSell = transactionRequest.qty
    const sharesOwned = holdings[transactionRequest.ticker]
    /*If the user owns 5 shares of company A and attemps to sell 6 shares of company B, canSell === false*/
    console.log(sharesToSell, sharesOwned)
    const canSell =
      sharesToSell <= sharesOwned &&
      transactionRequest.qty > 0 &&
      transactionRequest.qty < 100000000
    return canSell
  }
}

router.post('/', async (req, res, next) => {
  try {
    const {
      type,
      ticker,
      qty,
      price,
      portfolioId,
      holdings,
      userId,
      roomId
    } = req.body
    //Check to see if they have enough cash to purchase or shares to sell
    const validTransaction = checkIfTransactionValid(holdings, req.body)
    if (validTransaction) {
      //If the user does have enough cash or shares to perform their transaction, register to DB
      await Transaction.create({
        type,
        ticker,
        qty,
        price
      }).then(transaction => {
        console.log(portfolioId)
        transaction.setPortfolio(portfolioId)
      })

      if (type === 'buy') {
        await Portfolio.update(
          {cash: holdings.Cash - qty * price},
          {where: {userId, roomId}}
        )
      }
      if (type === 'sell') {
        await Portfolio.update(
          {cash: holdings.Cash + qty * price},
          {where: {userId, roomId}}
        )
      }

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

router.get('/:portfolioId', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        portfolioId: req.params.portfolioId
      }
    })
    res.json(transactions)
  } catch (error) {
    console.log(error)
  }
})
