const router = require('express').Router()
const { Page, User } = require('../models/')
const { addPage, wikiPage, editPage } = require('../views/')

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

router.post('/:slug', async (req, res, next) => {
  try {
    [updatedRowCount, updatedPages] = await Page.update(req.body, {
      where: {
        slug: req.params.slug
      },
      returning: true
    })

    console.log(`
    Just updated a page.

    ${updatedPages}
    `)

    res.redirect(`/wiki/${updatedPages[0].slug}`)
  } catch(err) {next(err)}
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

    if(page) {
      const author = await page.getAuthor()
      res.send(wikiPage(page, author))
    } else {
      res.send('A page with this title does not exist')
    }

  } catch(err) {
    next(err)
  }
})

router.get('/:slug/edit', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    })

    if(page === null) {res.sendStatus(404)}

    const author = await page.getAuthor()
    res.send(editPage(page, author))

  } catch(err) {next(err)}
})

module.exports = router
