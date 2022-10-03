

const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');

// Require controllers here
require('dotenv').config();
require('./config/database');

const User = require('./models/user');

let u, i, c, o;

const app = express();

// add in when the app is ready to be deployed
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build'))); // this allows express to find the build folder
// Configure the auth middleware
// This decodes the jwt token, and assigns
// the user information to req.user
// api routes must be before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/coins', require('./routes/api/coins'));
app.use('/api/watchlists', require('./routes/api/watchlists'));

// "catch all" route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});

// Nodemon Server
// NPM Start