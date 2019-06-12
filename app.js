var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usuarios');
var productsRouter = require('./routes/productos');
const constantes = require('./models/constantes');

var app = express();

/**
 * Conexion a base de datos
 */
var mongoose = require('mongoose');
let mongoDB = process.env.MONGODB_URI || "mongodb://localhost/modulo1-final";
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/**
 * Soporte para cookies.
 */
app.use(cookieParser());

app.use(session({
  key: constantes.getSessionKey(),
  secret: constantes.getSessionSecret(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: constantes.getSessionExpirationTime()
  }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie(constantes.getSessionKey());
  }
  next();
});

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/');
  }
  else {
    next();
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/productos', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
