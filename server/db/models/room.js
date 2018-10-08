const Sequelize = require('sequelize')
const db = require('../db')
var rn = require('random-number');

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
  expiration: {
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
  slug: {
    type: Sequelize.STRING,
  },
  users: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  startingCash: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  roomowner:{
    type: Sequelize.STRING,
    allowNull: false
  }
})

Room.generateSalt = function() {
  var options = {
    min:  10000
  , max:  99999
  , integer: true
  }
  return rn(options)
}

const saltSlug = room => {
    room.slug = Room.generateSalt()
}

Room.beforeCreate(saltSlug)

module.exports = Room
