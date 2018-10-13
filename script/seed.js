'use strict'

const db = require('../server/db')
const {User, Room, Portfolio} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const dbSeed = await Promise.all([
    await User.create({email: 'kevin@email.com'}),
    await User.create({email: 'matt@email.com'}),
    await User.create({email: 'joe@email.com'}),
    await User.create({email: 'aaron@email.com'}),
    await Room.create({name: 'Room #1', tickerQuery:['chk','amd','tsla','baba', 'mu'], expiration: new Date('October 10, 2018'), users:['1','2','3','4'], startingCash: 200000, roomowner: 'kevin@email.com'}),
    await Room.create({name: 'Room #2', tickerQuery:['twtr','crk','ppc','jd', 'teva'], expiration: new Date('October 10, 2018'), users:['1','2'], startingCash: 100000, roomowner: 'kevin@email.com'}),
    await Room.create({name: 'Room #3', tickerQuery:['jpm','intc','wmt','kmi', 'aapl'], expiration: new Date('October 10, 2018'), users:['1','2'], startingCash: 100000, roomowner: 'kevin@email.com'}),
    await Room.create({name: 'Room #4', tickerQuery:['nvda','tsn','ge','t', 'pf'], expiration: new Date('October 10, 2018'), users:['1','2'], startingCash: 100000, roomowner: 'kevin@email.com'}),
    await Portfolio.create({cash: 100000, userId: 1, roomId: 1}),
    await Portfolio.create({cash: 100000, userId: 1, roomId: 2}),
    await Portfolio.create({cash: 100000, userId: 1, roomId: 3}),
    await Portfolio.create({cash: 100000, userId: 1, roomId: 4}),
  ])

  console.log(`seeded ${dbSeed.length}, Lines in db`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
