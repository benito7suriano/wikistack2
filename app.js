const express = require('express')
const morgan = require('morgan')
const path = require('path')
const html = require('html-template-tag')

const { main } = require('./views')
const { db, Page, User } = require('./models')

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded( { extended:false } ))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/wiki', require('./routes/wiki'))
app.use('/users', require('./routes/user'))

app.get('/', async (req,res,next) => {

  try {
    const pages = await Page.findAll()
    res.send(main(pages))

  } catch(err) { next(err) }
})

module.exports = app
