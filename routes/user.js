const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.send('go to GET /users/')
})

router.post('/', (req, res, next) => {
  res.send('go to POST /users/')
})

router.get('/add', (req, res, next) => {
  res.send('go to GET /users/add')
})

module.exports = router
