'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const lti = require('./lti');

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'pug');

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev',
  resave: false,
  saveUninitialized: true,
}));

bodyParser.urlencoded({extended: false});

app.set('json spaces', 2);

app.enable('trust proxy');

app.get('/', (req, res, next) => {
  return res.send({status: 'Up'});
});

app.get('/application', (req, res, next) => {
  if (req.session.userId) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
  } else {
    next(new Error('Session invalid. Please login via LTI to use this application.'));
  }
});

app.post('/launch_lti', lti.handleLaunch);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
