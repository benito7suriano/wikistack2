const router = require('express').Router()
const { Page, User } = require('../models/')
const { addPage, wikiPage } = require('../views/')

router.get('/', (req, res, next) => {
  res.redirect('/')
})

router.post('/', async (req, res, next) => {

  try {
    const page = await Page.create(req.body)

    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.authorName,
        email: req.body.authorEmail
      }
    })

    page.setAuthor(user)

    console.log(`
    A page was just posted... beep boop

    Title: ${page.title}
    Content: ${page.content}
    Slug: ${page.slug}
    Status: ${page.status}
    _________________________

    Author: ${user.name}
    Email: ${user.email}
    `)

    // res.json(req.body)
    res.redirect(`/wiki/${page.slug}`)
  } catch(err) {
    next(err)
  }
})

router.get('/add', (req, res, next) => {
  res.send(addPage())
})

router.get('/:slug', async (req, res, next) => {

  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    })

    const authors = await page.getAuthor()
    const author = authors.dataValues

    console.log(author)

    res.send(wikiPage(page, author))
    // res.json(page)
  } catch(err) {
    next(err)
  }

})

module.exports = router
