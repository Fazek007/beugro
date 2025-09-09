const validateDomain = require('./middlewares/validateDomain');
const randomGenerator = require('./middlewares/randomGenerator');
const connectDB = require('./config/db');
const path = require("path");

var express = require("express");
var app = express()

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views')); // we have to go up by one because we are in src

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const data = { message: 'Hello from Express!' };
  res.render('form', data);
});

app.post('/submit', validateDomain, (req, res) => {
  const domain = req.body.domain.trim();
  res.redirect(`/decision?domain=${encodeURIComponent(domain)}`); //domain name is exposed in url, but in this case its okay not to hide it
});

app.get('/decision', randomGenerator, (req, res) => {
  const { decision, number, formattedDate } = req.randomResult;
  const domain = req.query.domain;
  res.render("decision", { decision, number, formattedDate, domain });
});

module.exports = app