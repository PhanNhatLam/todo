// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.send('I love CodersX');
});

var cvs = [
  { id: 1, todo: 'Đi chợ'}, 
  { id: 2, todo: 'Nấu cơm'}, 
  { id: 3, todo: 'Rửa bát'},
  { id: 4, todo: 'Học code tại CodersX'}
];

app.get('/todos', function(req, res) {
  var q = req.query.q;
  var matchedData = cvs;
  if (q) {
    matchedData = cvs.filter(function(cv) {
      return cvs.todo.toLowerCase().indexOf(q.toLowerCase()) > -1;
    });
  }
  
  res.render('todos/index', {
    cvs: matchedData
  });
});

app.post('/todos/create', function(req, res) {
  cvs.push(req.body);
	res.redirect('back');
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
