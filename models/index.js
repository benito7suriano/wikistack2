const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/wikistack2',{logging: false})
const generateSlug = require('../generateSlug')

const Page = db.define('pages', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: Sequelize.ENUM('open', 'closed')
})

Page.beforeValidate((page) => {
  page.slug = generateSlug(page.title)
})

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    isUnique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

Page.belongsTo(User, { as: 'author' })

module.exports = { db, Page, User }

