const html = require('html-template-tag')
const layout = require('./layout')

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki/">

    <div class="form-group">
      <label for="authorName" class="col-sm-2 control-label">Author Name</label>
      <div>
        <input id="authorName" name="authorName" type="text" class="form-control" />
      </div>
    </div>

    <div class="form-group">
      <label for="authorEmail" class="col-sm-2 control-label">Author Email</label>
      <input id="authorEmail" name="authorEmail" type="text" class="form-control" />
    </div>

    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
        <input id="title" name="title" type="text" class="form-control"/> <br>
    </div>

    <div class="form-group">
      <label for="tags" class="col-sm-2 control-label">Page Tags</label>
        <input id="tags" name="tags" type="text" class="form-control"/> <br>
    </div>

    <div class="form-group">
      <textarea rows="10" cols="100" id="content" name="content" class="form-control" placeholder="Enter text here..."></textarea>
    </div>

    <div class="form-group">
      <input type="radio" name="status" value="open" checked> Open <br>
      <input type="radio" name="status" value="closed"> Closed <br>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>

  </form>
`)
