const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
  cash:{
    type: Sequelize.INTEGER
  }
})

module.exports = Portfolio
