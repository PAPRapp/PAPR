const router = require('express').Router()
const Room = require('../db/models/room')
const Portfolio = require('../db/models/portfolio')
// const Rooms = require('../db/models/room')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router
// const admin = require('firebase-admin')

router.post('/', async (req, res, next) => {
  //validate token
  //send token to google firebase
  //success or failure
  //if valid run the rest of the code
  //otherwise do nothing
  const userId = req.body.userId
  try {
    const rooms = await Room.findAll({
      where: {
        users: {
          [Op.contains]: [userId]
        }
      }
    })
    res.json(rooms)
  } catch (error) {
    res.send(error)
  }
})

router.post('/room', async (req, res, next) => {
  const userId = req.body.userId
  const roomId = req.body.roomId
  try {
    const rooms = await Room.findOne({
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

    res.json(rooms)
  } catch (error) {
    res.send(error)
  }
})

//create a room & porfolio and make association together along with user
router.post('/create', async (req, res, next) => {
  const startingCash = req.body.startingCash
  const tickerQuery = req.body.tickers
  const exp = req.body.exp
  const name = req.body.name
  const userId = req.body.user
  try {
    const createPortfolio = await Portfolio.create({
      cash: startingCash
    })
    const createdRoom = await Room.create({
      name,
      tickerQuery,
      exp,
      startingCash
    })
    createPortfolio.setRoom(createdRoom)
    createPortfolio.setUser(userId)
    const getSlug = await Rooms.findById(createdRoom.id)
    const slug = getSlug.slug
      await Room.update(
      {users: Sequelize.fn('array_append', Sequelize.col('users'), userId)},
      {where: {slug}}
    )
    res.json(getSlug.slug)
  } catch (error) {
    next(error)
  }
})
