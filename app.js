const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const layout = require('./views/layout')
const html = require('html-template-tag')
const PORT = 1337

const wikiRoute = require('./routes/wiki')
const userRoute = require('./routes/user')

const {db, Page, User} = require('./models')

const init = async () => {
  await db.sync({ force: true })

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

app.get('/', (req,res,next)=> {
  res.send(layout(html`
  <h1>Hello There! Welcome to Wikistack.</h1>
  `))
})

init()



