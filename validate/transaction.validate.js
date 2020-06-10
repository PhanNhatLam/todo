var db = require('../db');

module.exports.isComplete = function(req, res, next) {
  var id = req.params.id;
  
  var idTransactions = db.get("transactions").find({ id: id }).value();
  
  var error = "Value does not exist!";
  
  if (!db.get("transactions").find({ id: id }).value()) {
    return res.render("transactions/index", {
      transactions: db.get("transactions").value(),
      error,
    });
  }
  
  next();
}