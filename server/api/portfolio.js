const router = require('express').Router()
const {Portfolio} = require('../db/models')
const {Transaction} = require('../db/models')
module.exports = router

router.get('/:roomId/:userId', async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({
      where: {userId: req.params.userId, roomId: req.params.roomId}
    })
    const transactions = await Transaction.findAll({
      where: {portfolioId: portfolio.id}
    })
    const portfolioTotal = {}
    transactions.map(element => {
      if (!portfolioTotal[element.ticker]) {
        portfolioTotal[element.ticker] =
          element.type === 'buy' ? element.qty : -element.qty
      } else if (element.type === 'buy') {
        portfolioTotal[element.ticker] += element.qty
      } else {
        portfolioTotal[element.ticker] -= element.qty
      }
    })

    res.json(portfolioTotal)
  } catch (err) {
    next(err)
  }
})
