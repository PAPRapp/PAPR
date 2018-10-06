const router = require('express').Router()
const Rooms = require('../db/models/room')
const Sequelize = require('sequelize')
module.exports = router

router.get('/:id', async (req, res, next) => {
  const userIds = req.body.userId
  console.log(req.user)
  const slug = req.params.id
  try {
    if (!userIds) {
      res.json('No User Found')
    } else {
      const findRoom = await Rooms.update(
        {users: Sequelize.fn('array_append', Sequelize.col('users'), userIds)},
        {where: {slug}}
      )
      res.json(findRoom)
    }
  } catch (error) {
    next(error)
  }
})
