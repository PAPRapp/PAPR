const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const email = req.query.email
  try {
    const users = await User.findOne({
      where:{
        email
      }
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})


router.post('/', async (req, res, next) => {
  const {email} = req.body
  try {
    const user = await User.create({
      email
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
