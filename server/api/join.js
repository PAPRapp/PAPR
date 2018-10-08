const router = require('express').Router()
const Rooms = require('../db/models/room')
const Sequelize = require('sequelize')
module.exports = router

router.put('/:id', async (req, res, next) => {
  const userId = req.body.userId
  const slug = req.params.id
  try {
    if (!userId) {
      res.json('No User Found')
    } else {
      const findRoom = await Rooms.update(
        {users: Sequelize.fn('array_append', Sequelize.col('users'), userId)},
        {where: {slug}}
      )
      res.json(findRoom)
    }
  } catch (error) {
    next(error)
  }
})
