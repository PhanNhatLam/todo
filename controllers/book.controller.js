var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res) {
  var q = req.query.q;
  var matchedData = db.get("books").value();
  if (q) {
    matchedData = db
      .get("books")
      .value()
      .filter(function(book) {
        return book.title.toLowerCase().indexOf(q.toLowerCase()) > -1;
      });
  }

  res.render("books/index", {
    books: matchedData,
    currentUrl: "books"
  });
};

module.exports.view = function(req, res) {
  var id = req.params.id;
  var book = db
    .get("books")
    .find({ id: id })
    .value();
  
  res.render("books/view", {
    book: book
  });
};

module.exports.delete = function(req, res) {
  var id = req.params.id;
  var del = db
    .get("books")
    .remove({ id: id })
    .write();

  res.redirect("/books");
}

module.exports.getUpdate = function(req, res) {
  var id = req.params.id;
  var book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("books/update", {
    book: book
  });
};

module.exports.postUpdate = function(req, res) {
  var id = req.params.id;
  console.log(req.body);
  var book = db
    .get("books")
    .find({ id: id })
    .assign({ title: req.body.title, description: req.body.description })
    .write();

  res.redirect("/books");
};

module.exports.getCreate = function(req, res) {
  res.render("books/create");
};

module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
};