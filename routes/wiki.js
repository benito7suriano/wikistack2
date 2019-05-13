const router = require('express').Router()
const { Page } = require('../models/')
const { addPage, wikiPage } = require('../views/')

router.get('/', (req, res, next) => {
  res.redirect('/wiki')
})

router.post('/', async (req, res, next) => {
  // res.json(req.body)

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    slug: req.body.slug,
    status: req.body.status
  })

  try {
    await page.save()

    console.log(`
    A page was just posted... beep boop

    Title: ${page.title}
    Content: ${page.content}
    Slug: ${page.slug}
    Status: ${page.status}
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
  console.log(`hit dynamic route at ${req.params.slug}`)

  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    })

    res.send(wikiPage(page))
    // res.json(page)
  } catch(err) {
    next(err)
  }

})

module.exports = router
