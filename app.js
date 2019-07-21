'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const lti = require('./lti');

const port = process.env.PORT || 3000;
// this express server should be secured/hardened for production use
const app = express();

app.set('view engine', 'pug');
// memory store shouldn't be used in production
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev',
  resave: false,
  saveUninitialized: true,
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

app.set('json spaces', 2);

app.enable('trust proxy');

app.get('/', (req, res, next) => {
  return res.send({status: 'Up'});
});

app.get('/application', (req, res, next) => {
  if (req.session.userId) {
    return res.render('index', {
      email: req.session.email,
      username: req.session.username,
      ltiConsumer: req.session.ltiConsumer,
      userId: req.session.userId,
      isTutor: req.session.isTutor,
      context_id: req.session.context_id
    })
  } else {
    next(new Error('Session invalid. Please login via LTI to use this application.'));
  }
});

app.post('/launch_lti', lti.handleLaunch);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
