const Portfolio = require('./portfolio')
const User = require('./user')
const Transaction = require('./transaction')
const Room = require('./room')
const Message = require('./message')

Portfolio.belongsTo(User)
User.hasMany(Portfolio)

Portfolio.hasMany(Transaction)
Transaction.belongsTo(Portfolio)

Room.hasMany(Portfolio)
Portfolio.belongsTo(Room)

Room.hasMany(Message)
Message.belongsTo(Room)

User.hasMany(Message)
Message.belongsTo(User)

module.exports = {
  User,
  Room,
  Portfolio,
  Transaction,
  Message
}
