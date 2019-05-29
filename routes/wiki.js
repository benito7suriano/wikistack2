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

    res.redirect(`/wiki/${page.slug}`)

  } catch(err) {
    next(err)
  }

  // res.json(req.body)
})

router.post('/:slug', async (req, res, next) => {
  try {
    [updatedRowCount, updatedPages] = await Page.update({ ...req.body, tags: req.body.tags.split(' ')}, {
      where: {
        slug: req.params.slug
      },
      returning: true
    })

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
      res.status(404).send('A page with this title does not exist')
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

router.get('/:slug/delete', async(req, res, next) => {
  try {
    await Page.destroy({
      where: {
        slug: req.params.slug
      }
    })

    res.redirect('/')

  } catch(err) {next(err)}
})

module.exports = router
