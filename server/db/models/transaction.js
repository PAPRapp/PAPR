const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction',{
  type:{
    type: Sequelize.ENUM('buy', 'sell')
  },
  company:{
    type: Sequelize.STRING
  },
  ticker:{
    type: Sequelize.STRING
  },
  qty:{
    type:Sequelize.INTEGER
  },
  price:{
    type: Sequelize.INTEGER
  }
})

module.exports = Transaction
