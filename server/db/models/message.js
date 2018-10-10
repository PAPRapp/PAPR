const Sequelize = require('sequelize')
const db = require('../db')
const Room = require('./room')

const Message = db.define('message', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Message.getMessages = async function(id) {
  const messages = await Message.findAll({
    where: {roomId: id}
  })
  return messages
}

module.exports = Message
