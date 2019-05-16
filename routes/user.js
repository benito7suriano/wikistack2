const router = require('express').Router()
const { User, Page } = require('../models')
const { userList, userPages } = require('../views')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.send(userList(users))
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      }
    })

    const pagesByUser = await user.getPages()

    res.send(userPages(user, pagesByUser))
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  res.send('go to POST /users/')
})

router.get('/add', (req, res, next) => {
  res.send('go to GET /users/add')
})

module.exports = router
