const Portfolio = require('./portfolio');
const User = require('./user')
const Transaction = require('./transaction')
const Room = require('./room')

Portfolio.belongsTo(User)
User.hasMany(Portfolio)

Portfolio.hasMany(Transaction)
Transaction.belongsTo(Portfolio)

Room.hasMany(Portfolio)
Portfolio.belongsTo(Room)

module.exports = {
  User,
  Room,
  Portfolio,
  Transaction
}
