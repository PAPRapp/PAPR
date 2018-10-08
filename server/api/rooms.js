const router = require('express').Router()
const {
  createroom,
  joinroom,
  getallrooms,
  getuserroomportfolio
} = require('./utilis/rooms')
module.exports = router
// const admin = require('firebase-admin')

//Finds all rooms that particular user is allowed to see
router.post('/', async (req, res, next) => {
  //validate token
  //send token to google firebase
  //success or failure
  //if valid run the rest of the code
  //otherwise do nothing
  const userId = req.body.userId
  try {
    const response = await getallrooms(userId)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

//Finds all Portfolio assocaited with specific room and user
router.post('/room', async (req, res, next) => {
  const userId = req.body.userId
  const roomId = req.body.roomId
  try {
    const response = await getuserroomportfolio(userId, roomId)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

//Creates a new room sets the room owner as that user, adds user to room, creates a new portfolio and associates the user to new portfolio and portfolio to new room
router.post('/create', async (req, res, next) => {
  const startingCash = req.body.startingCash
  const tickerQuery = req.body.tickers
  const expiration = req.body.expiration
  const name = req.body.name
  const userId = req.body.user
  try {
    const response = await createroom(
      startingCash,
      tickerQuery,
      expiration,
      name,
      userId
    )
    res.json(response)
  } catch (error) {
    next(error)
  }
})

//Finds room by unique slug and adds user to room, creates new portfolio for user and makes assocaition to room and user
router.put('/join/:id', async (req, res, next) => {
  const userId = req.body.userId
  const slug = req.params.id
  try {
    const response = await joinroom(userId, slug)
    res.send(response)
  } catch (error) {
    next(error)
  }
})
