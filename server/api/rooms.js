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
    const Rooms = await Room.findOne({
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

router.use('/', async (req, res, next) => {})
