const connectDB = require('./config/db');
const path = require("path");
const mainRoutes = require('./routes/mainRoutes');
const express = require("express");
const session = require("express-session");
const app = express()

connectDB();

const SESSION_SECRET = process.env.SESSION_SECRET;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views')); // we have to go up by one because we are in src

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use('/', mainRoutes);


module.exports = app