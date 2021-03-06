const html = require('html-template-tag')
const layout = require('./layout')

module.exports = (page, author) => {
  const split = (str) => {
    return str.split(' ')
  }

  return layout(html`
  <h3>Edit a Page</h3>
  <hr>
  <form method="POST" action="/wiki/${page.slug}">

    <div class="form-group">
      <label for="authorName" class="col-sm-2 control-label">Author's Name</label>
      <div class="col-sm-10">
        <input name="authorName" type="text" class="form-control" value="${author.name}" />
      </div>
    </div>

    <div class="form-group">
      <label for="authorEmail" class="col-sm-2 control-label">Author's Email</label>
      <div class="col-sm-10">
        <input name="authorEmail" type="text" class="form-control" value="${author.email}" />
      </div>
    </div>

    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input name="title" type="text" class="form-control" value="${page.title}"/>
      </div>
    </div>

    <div class="form-group">
      <label for="tags" class="col-sm-2 control-label">Page Tags</label>
      <div class="col-sm-10">
        <input name="tags" type="text" class="form-control" value="${page.tags.join(' ')}"/>
      </div>
    </div>

    <div class="form-group">
      <label for="content" class="col-sm-2 control-label">Content</label>
      <textarea name="content" type="text" class="form-control" rows="4">${page.content}</textarea>
    </div>

    <div class="form-group">
      <label for="content" class="col-sm-2 control-label">Status</label>
      <div class="col-sm-10">
        <select name="status">
          <option ${page.status == 'open' ? 'selected' : ''}>open</option>
          <option ${page.status == 'closed' ? 'selected' : ''}>closed</option>
        </select>
      </div>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">submit</button>
    </div>
  </form>
  `)
}
