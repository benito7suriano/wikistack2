const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const { main } = require('./views')
const html = require('html-template-tag')
const PORT = 1337

const wikiRoute = require('./routes/wiki')
const userRoute = require('./routes/user')

const {db, Page, User} = require('./models')

const init = async () => {
  await db.sync({})

  app.listen(PORT, console.log(`Server listening on port ${PORT}`))
}

db.authenticate().
  then(() => {
    console.log('Connected to the db')
  })

app.use(morgan('dev'))
app.use(express.urlencoded( { extended:false } ))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/wiki', wikiRoute)
app.use('/users', userRoute)

app.get('/', async (req,res,next) => {

  try {
    const pages = await Page.findAll()
    res.send(main(pages))

  } catch(err) {
    next(err)
  }
})

init()
