const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.send('go to GET /wiki/')
})

router.post('/', (req, res, next) => {
  res.send('go to POST /wiki/')
})

router.get('/add', (req, res, next) => {
  res.send('go to GET /wiki/add')
})

module.exports = router
