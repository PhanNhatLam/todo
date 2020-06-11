// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var bookRoute = require('./routes/book.route');
var userRoute = require('./routes/user.route');
var transactionRoute = require('./routes/transaction.route');

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(express.static('public'));

// index page
app.get("/", function(req, res) {
  res.render('home');
});

// Books
app.use('/books', bookRoute);

// Users
app.use('/users', userRoute);

// Transactions
app.use('/transactions', transactionRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

/**
bookController.update = async (req, res, next) => {
  // render view update book
}

bookController.postUpdate = async (req, res, next) => {
  var { id } = req.params;
  var book = db.get('books').find({ id: id });
  book.title = req.body.title;
  book.save() // luu lai vo trong db
  return res.render('books');
}
*/
// app.get('/book/:id/update', bookController.update);
// app.post('/book/:id/update', bookController.postUpdate);
