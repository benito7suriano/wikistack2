const http = require('http')
const app = require('./app')

const { db, Page, User } = require('./models')

const PORT = 1337

const init = async () => {
  await db.sync()

  app.listen(PORT, console.log(`Server listening on port ${PORT}`))
}

db.authenticate().
  then(() => {
    console.log('Connected to the db')
  })

init()
