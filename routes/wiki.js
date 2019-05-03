const router = require('express').Router()
const { addPage } = require('../views/')

router.get('/', (req, res, next) => {
  res.redirect('/wiki')
})

router.post('/', (req, res, next) => {
  res.send('go to POST /wiki/')
})

router.get('/add', (req, res, next) => {
  res.send(addPage())
})

module.exports = router
