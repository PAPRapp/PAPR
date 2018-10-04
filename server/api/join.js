const router = require('express').Router()
const Rooms = require('../db/models/room')
module.exports = router

router.put('/:id', async (req, res, next) => {
  const slug = req.params.id.split("/").join("")
  const userIds = req.body.userId
  try {
    const findRoom = await Rooms.update(
      {users:[userIds]
      },
      {
        where:{slug}
      }
    )
    res.json(findRoom)
  } catch (error) {
    next(error)
  }
})
