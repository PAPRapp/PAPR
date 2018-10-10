// const router = require('express').Router()
// const {Portfolio} = require('../db/models')
// const {Transaction} = require('../db/models')
// module.exports = router

// router.put(`/:roomId/:userId`, async (req, res, next) => {
//   try {
//     let balance = 0
//     const {type, qty, price} = req.body
//     const portfolio = await Portfolio.findOne({
//       where: {userId: req.params.userId, roomId: req.params.roomId}
//     })
//     if (type.toString() === 'buy') {
//       balance = portfolio.cash - qty * price
//     } else {
//       balance = portfolio.cash + qty * price
//     }
//     await Portfolio.update(
//       {cash: balance},
//       {where: {userId: req.params.userId, roomId: req.params.roomId}}
//     )
//     const newPortfolio = await Portfolio.findOne({
//       where: {userId: req.params.userId, roomId: req.params.roomId}
//     })
//     res.json(newPortfolio)
//   } catch (error) {
//     next(error)
//   }
// })

const router = require('express').Router()
const {Portfolio, User} = require('../db/models')
module.exports = router

// router.get('/:roomId/:userId', async (req, res, next) => {
//   try {
//     const portfolio = await Portfolio.findOne({
//       where: {userId: req.params.userId, roomId: req.params.roomId}
//     })
//     const portfolioTotal = await portfolio.getHoldings()

//     res.json(portfolioTotal)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/:roomId/:userId', async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({
      where: {userId: req.params.userId, roomId: req.params.roomId}
    })
    // const transactions = await Transaction.findAll({
    //   where: {portfolioId: portfolio.id}
    // })
    // const portfolioTotal = {}
    // portfolioTotal.cash = portfolio.cash
    // transactions.map(element => {
    //   if (!portfolioTotal[element.ticker]) {
    //     portfolioTotal[element.ticker] =
    //       element.type === 'buy' ? element.qty : -element.qty
    //   } else if (element.type === 'buy') {
    //     portfolioTotal[element.ticker] += element.qty
    //   } else {
    //     portfolioTotal[element.ticker] -= element.qty
    //   }
    // })

    res.json(portfolio)
  } catch (err) {
    next(err)
  }
})

router.get('/:roomId', async (req, res, next) => {
  try {
    const portfolios = await Portfolio.findAll({
      where: {
        roomId: req.params.roomId
      }
    })

    let allPortfolios = await Promise.all(
      portfolios.map(async portfolio => {
        const portfolioTotal = await portfolio.getHoldings()
        const user = await User.findById(portfolio.userId)
        portfolioTotal.userEmail = user.email
        return portfolioTotal
      })
    )

    res.json(allPortfolios)
  } catch (error) {
    console.log(error)
  }
})

router.put(`/:roomId/:userId`, async (req, res, next) => {
  try {
    let balance = 0
    const {type, qty, price} = req.body
    const portfolio = await Portfolio.findOne({
      where: {userId: req.params.userId, roomId: req.params.roomId}
    })
    if (type.toString() === 'buy') {
      balance = portfolio.cash - qty * price
    } else {
      balance = portfolio.cash + qty * price
    }
    await Portfolio.update(
      {cash: balance},
      {where: {userId: req.params.userId, roomId: req.params.roomId}}
    )
    const newPortfolio = await Portfolio.findOne({
      where: {userId: req.params.userId, roomId: req.params.roomId}
    })
    res.json(newPortfolio)
  } catch (error) {
    next(error)
  }
})
