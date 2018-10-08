const Room = require('../../db/models/room')
const User = require('../../db/models/user')
const Portfolio = require('../../db/models/portfolio')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const getallrooms = async userId => {
  const Rooms = await Room.findAll({
    where: {
      users: {
        [Op.contains]: [userId]
      }
    }
  })
  return Rooms
}

const getuserroomportfolio = async (userId, roomId) => {
  const Rooms = await Room.findOne({
    where: {
      id: roomId
    },
    include: [
      {
        model: Portfolio,
        where: {
          userId
        }
      }
    ]
  })
  return Rooms
}

const createroom = async (
  startingCash,
  tickerQuery,
  expiration,
  name,
  userId
) => {
  const findUser = await User.findById(userId)
  const roomowner = findUser.email
  const createPortfolio = await Portfolio.create({
    cash: startingCash
  })
  const createdRoom = await Room.create({
    name,
    tickerQuery,
    expiration,
    startingCash,
    roomowner
  })
  createPortfolio.setRoom(createdRoom)
  createPortfolio.setUser(userId)
  const getSlug = await Room.findById(createdRoom.id)
  const slug = getSlug.slug
  await Room.update(
    {users: Sequelize.fn('array_append', Sequelize.col('users'), userId)},
    {where: {slug}}
  )
  return getSlug.slug
}

const joinroom = async (userId, slug) => {
  if (!userId) {
    return 'NO USER FOUND'
  } else {
    const findUserinRoom = await Room.findOne({
      where: {
        slug,
        users: {
          [Op.contains]: [userId]
        }
      }
    })
    if (findUserinRoom) {
      return 'USER ALREADY IN ROOM'
    } else {
      const findRoom = await Room.findOne({
        where: {
          slug
        }
      })
      const startingCash = findRoom.startingCash
      const createPortfolio = await Portfolio.create({
        cash: startingCash
      })
      await Room.update(
        {users: Sequelize.fn('array_append', Sequelize.col('users'), userId)},
        {where: {slug}}
      )
      createPortfolio.setRoom(findRoom)
      createPortfolio.setUser(userId)
      return 'USER ADDED TO ROOM'
    }
  }
}

module.exports = {createroom, joinroom, getallrooms, getuserroomportfolio}
