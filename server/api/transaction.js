const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const {type, company, ticker, qty, price, portfolio} = req.body
    const transaction = await Transaction.create({
      type: type,
      company: company,
      ticker: ticker,
      qty: qty,
      price: price,
      portfolioId: portfolio.id
    })
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})
