var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res) {
  var q = req.query.q;
  var matchedData = db.get("transactions").value();
  if (q) {
    matchedData = db
      .get("transactions")
      .value()
      .filter(function(transaction) {
        return transaction.userId.toLowerCase().indexOf(q.toLowerCase()) > -1;
      });
  }

  res.render("transactions/index", {
    transactions: matchedData,
    currentUrl: "transactions"
  });
};

module.exports.view = function(req, res) {
  var id = req.params.id;
  var transaction = db
    .get("transactions")
    .find({ id: id })
    .value();
  
  res.render("transactions/view", {
    transaction: transaction
  });
};

module.exports.delete = function(req, res) {
  var id = req.params.id;
  var remove = db
    .get("transactions")
    .remove({ id: id })
    .write();

  res.redirect("/transactions");
};

// Create
module.exports.getCreate = function(req, res) {
  var users = db
    .get("users")
    .value();
  
  var books = db
    .get("books")
    .value();
  
  res.render("transactions/create", {
    users: users,
    books: books
  });
  res.redirect("/transactions");
};

module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  req.body.isComplete = false;
  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("/transactions");
};

// Status
module.exports.isComplete = function(req, res) {
  var id = req.params.id;
  
  var idTransactions = db.get("transactions").find({ id: id }).value();
  
  var error = "Value does not exist!";
  
  if (!db.get("transactions").find({ id: id }).value()) {
    return res.render("transactions/index", {
      transactions: db.get("transactions").value(),
      error,
    });
  }
  
  db.get("transactions")
    .find({ id: id })
    .assign({ isComplete: true })
    .write();
  res.redirect("/transactions");
};