const router = require('express').Router()
const { Page, User } = require('../models/')
const { addPage, wikiPage } = require('../views/')

router.get('/', (req, res, next) => {
  res.redirect('/')
})

router.post('/', async (req, res, next) => {
  const page = new Page(req.body)

  try {
    await page.save()

    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.authorName,
        email: req.body.authorEmail
      }
    })

    await page.setAuthor(user)

    console.log(`
    A page was just posted... beep boop

    Title: ${page.title}
    Content: ${page.content}
    Slug: ${page.slug}
    Status: ${page.status}
    AuthorId: ${page.authorId}
    _________________________

    Author: ${user.name}
    Email: ${user.email}
    `)

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

    // BUG
    const authors = await page.getAuthor()
    console.log(authors)

    res.send(wikiPage(page, authors))

  } catch(err) {
    next(err)
  }

})

module.exports = router
