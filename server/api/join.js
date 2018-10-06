const router = require('express').Router()
const Rooms = require('../db/models/room')
const Sequelize = require('sequelize')
module.exports = router

router.put('/:id', async (req, res, next) => {
  const userId = req.body.userId
  const slug = req.params.id
  console.log(userId, slug)
  try {
    if (!userId) {
      res.json('No User Found')
    } else {
      console.log('Adding User to room')
      const findRoom = await Rooms.update(
        {users: Sequelize.fn('array_append', Sequelize.col('users'), userId)},
        {where: {slug}}
      )
      console.log('Added user to room')
      res.json(findRoom)
    }
  } catch (error) {
    next(error)
  }
})
