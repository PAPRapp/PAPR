const Sequelize = require('sequelize')
const crypto = require('crypto')
const aleaRNGFactory = require('number-generator/lib/aleaRNGFactory');
const { uInt32 } = aleaRNGFactory(10);
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
  slug: {
    type: Sequelize.STRING,
  },
  users: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  }
})

Room.generateSalt = function() {
  return uInt32()
}

const saltSlug = room => {
    room.slug = Room.generateSalt()
}

Room.beforeCreate(saltSlug)

module.exports = Room
