const html = require('html-template-tag')
const layout = require('./layout')

module.exports = () => layout(html`
  <h3>NOT FOUND</h3>

  <h5>The page you were looking for was not found. Please try something different.</h5>
  `)
