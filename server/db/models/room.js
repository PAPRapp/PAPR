const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto');

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


const UrlSafe = (slug) => {
  const excludeSlug = []
  for(let i = 0; i < slug.length; i++){
    if(slug[i] === "/" || slug[i] === "?" || slug[i] === "=" || slug[i] === "+"){
      continue
    }else{
      excludeSlug.push(slug[i])
    }
  }
  return excludeSlug.join('')
}

Room.generateSlug = function() {
  const slug = crypto.randomBytes(16).toString('base64').split('')
  return UrlSafe(slug)
}

const genSlug = (room) => {
    room.slug = Room.generateSlug()
}

Room.beforeCreate(genSlug)

module.exports = Room
