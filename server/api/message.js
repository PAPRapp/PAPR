const router = require('express').Router()
const {Message, User} = require('../db/models')
const axios = require('axios')

module.exports = router

router.get('/:roomId', async (req, res, next) => {
  const {roomId} = req.params
  const roomMessages = await Message.getMessages(roomId)
  res.json(roomMessages)
})

router.post('/:roomId/:userId', async (req, res, next) => {
  const {roomId, userId} = req.params
  const {content} = req.body

  try {
    const user = await User.findById(userId)
    const username = user.email.split('@')[0]
    const message = await Message.build({
      content: content,
      userId,
      roomId,
      username
    })
    await message.save()
    res.json(message)
  } catch (err) {
    next(err)
  }
})
