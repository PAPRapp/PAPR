const Sequelize = require('sequelize')
const db = require('../db')
const Transaction = require('./transaction')

const Portfolio = db.define('portfolio', {
  cash: {
    type: Sequelize.INTEGER
  }
})

Portfolio.prototype.getHoldings = async function() {
  const transactions = await Transaction.findAll({
    where: {portfolioId: this.id}
  })
  const portfolioTotal = {}
  portfolioTotal.user = this.userId
  portfolioTotal.cash = this.cash
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
  return portfolioTotal
}

module.exports = Portfolio
