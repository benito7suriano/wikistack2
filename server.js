const http = require('http')
const app = require('./app')
const { db } = require('./models')

const PORT = 1337

const init = async () => {
  await db.sync()

  db.authenticate()
    .then(() => {
      console.log('Connected to the db')
    })
    .catch(() => {
      console.error('Oops... somethings wrong')
    })

  app.listen(PORT, console.log(`Server listening on port ${PORT}`))
}

init()
