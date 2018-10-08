const router = require('express').Router()
const Rooms = require('../db/models/room')
const Sequelize = require('sequelize')
const Portfolio = require('../db/models/portfolio')
const Op = Sequelize.Op
module.exports = router

router.put('/:id', async (req, res, next) => {
  const userId = req.body.userId
  const slug = req.params.id
  try {
    if (!userId) {
      res.json('No User Found')
    } else {
      const findUserinRoom = await Rooms.findOne({
        where: {
          slug,
          users: {
            [Op.contains]: [userId]
          }
        }
      })
      if(findUserinRoom){
        res.sendStatus(401)
      }else{
      const findRoom = await Rooms.findOne({
        where:{
          slug
        }
      })
      const startingCash = findRoom.startingCash
      const createPortfolio = await Portfolio.create({
        cash: startingCash
      })
      const addToRoom = await Rooms.update(
        {users: Sequelize.fn('array_append', Sequelize.col('users'), userId)},
        {where: {slug}}
      )
      createPortfolio.setRoom(findRoom)
      createPortfolio.setUser(userId)
      res.json(addToRoom)
    }
  }
  } catch (error) {
    next(error)
  }
})
