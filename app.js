const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const layout = require('./views/layout')



app.use(morgan('dev'))
app.use(express.urlencoded( { extended:false } ))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req,res,next)=> {
  res.send(layout('Empty string of nothing'))
})

const PORT = 1337

app.listen(PORT, console.log(`Server listening on port ${PORT}`))

