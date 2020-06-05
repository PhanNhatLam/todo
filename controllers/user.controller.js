var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res) {
  var q = req.query.q;
  var matchedData = db.get("users").value();
  if (q) {
    matchedData = db
      .get("users")
      .value()
      .filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
      });
  }

  res.render("users/index", {
    users: matchedData,
    currentUrl: "users"
  });
};

module.exports.view = function(req, res) {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  
  res.render("users/view", {
    user: user
  });
};

module.exports.delete = function(req, res) {
  var id = req.params.id;
  var del = db
    .get("users")
    .remove({ id: id })
    .write();

  res.redirect("/users");
};

module.exports.getUpdate = function(req, res) {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/update", {
    user: user
  });
};

module.exports.postUpdate = function(req, res) {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .assign({ name: req.body.name, phone: req.body.phone })
    .write();

  res.redirect("/users");
};

module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("back");
};