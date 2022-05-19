const createError = require('http-errors');
const express = require('express');
const basicAuth = require('express-basic-auth');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const dataAccessor = require('./data/dataAccessor');

// hashing service
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// basic auth
const getUnauthorizedResponse = (req) => {
  return req.auth
    ? 'Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected'
    : 'No credentials provided';
};
const myAuthorizer = async (username, password, cb) => {
  let userFound = await dataAccessor.users.findByUsername(username);

  if (userFound.data[0] === undefined || password === undefined) {
    return cb(null, false);
  }
  const userMatches = basicAuth.safeCompare(
    username,
    userFound.data[0].username
  );

  const passwordMatches = bcrypt.compareSync(
    password,
    userFound.data[0].password
  );
  if (userMatches && passwordMatches) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
};
app.use(
  basicAuth({
    challenge: true,
    unauthorizedResponse: getUnauthorizedResponse,
    authorizer: myAuthorizer,
    authorizeAsync: true,
  })
);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
