const router = require('express').Router()
const Room = require('../db/models/room')
const Sequelize = require('sequelize');
const Op = Sequelize.Op
module.exports = router

router.use('/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const Rooms = await Room.findAll({
      where:{
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
