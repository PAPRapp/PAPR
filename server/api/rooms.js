const router = require('express').Router()
const Room = require('../db/models/room')
const Portfolio = require('../db/models/portfolio')
const User = require('../db/models/user')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/:userId', async (req, res, next) => {
  //validate token
  //send token to google firebase
  //success or failure
  //if valid run the rest of the code
  //otherwise do nothing
  const userId = req.params.userId
  try {
    const Rooms = await Room.findAll({
      where: {
        users: {
          [Op.contains]: [userId]
        }
      }
    })
    res.json(Rooms)
  } catch (error) {
    res.send(error)
  }
})

router.post('/room', async (req, res, next) => {
  //validate token
  //send token to google firebase
  //success or failure
  //if valid run the rest of the code
  //otherwise do nothing
  const userId = req.body.userId
  const roomId = req.body.roomId
  console.log(req.body)
  try {
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

    res.json(Rooms)
  } catch (error) {
    res.send(error)
  }
})

//create a room & porfolio and make association together along with user
router.post('/create', async (req, res, next) => {
  const user = req.body.userId
  const cash = req.body.startingCash
  const tickerQuery = req.body.tickers
  const exp = req.body.exp
  const name = req.body.name
  try {
    const findUser = await User.findById(user)
    const createPortfolio = await Portfolio.create({
      cash
    })
    const createdRoom = await Room.create({
      name,
      tickerQuery,
      exp
    })
    createPortfolio.setRoom(createdRoom)
    createPortfolio.setUser(findUser)
    const getSlug = await Room.findById(createdRoom.id)
    res.json(getSlug.slug)
  } catch (error) {
    next(error)
  }
})
