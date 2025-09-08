const formMiddleware = require('./middlewares/formMiddleware');
const path = require("path");

var express = require("express");
var app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views')); // we have to go up by one because we are in src

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/', (req, res) => {
  const data = { title: 'My Main Page', message: 'Hello from Express!' };
  res.render('form', data);
});

module.exports = app