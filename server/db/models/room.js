const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tickerQuery: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  start: {
    type: Sequelize.DATE,
    defaultValue: Date.now(),
    allowNull: false
  },
  exp: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      min: Date.now()
    }
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  users: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false
  }
})

module.exports = Room
