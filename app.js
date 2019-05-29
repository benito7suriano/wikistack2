const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const html = require('html-template-tag')

const { main, notFound, shit } = require('./views')
const { Page, User } = require('./models')

const app = express()

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded( { extended:false } ))
app.use(bodyParser.json())

app.use('/wiki', require('./routes/wiki'))
app.use('/users', require('./routes/user'))

app.get('/', async (req,res,next) => {

  try {
    const pages = await Page.findAll()
    res.send(main(pages))

  } catch(err) { next(err) }
})

app.use((req,res,next) => {
  res.status(404).send(notFound())
})

app.use((err,req,res,next) => {
  res.status(500).send(shit())
})

module.exports = app
