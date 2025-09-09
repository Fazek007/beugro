const validateDomain = require('./middlewares/validateDomain');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const path = require("path");

var express = require("express");
var app = express()

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views')); // we have to go up by one because we are in src

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/', (req, res) => {
  const data = { message: 'Hello from Express!' };
  res.render('form', data);
});

app.post('/submit', validateDomain, (req, res) => {
  const domain = req.body.domain.trim();
  res.render('form');
});

module.exports = app