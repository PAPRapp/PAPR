const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {type, company, ticker, qty, price, portfolioId} = req.body
    const transaction = await Transaction.create({
      type: type,
      company: company,
      ticker: ticker,
      qty: qty,
      price: price,
      portfolioId: portfolioId
    })
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})
