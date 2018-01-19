var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport= require('passport');
var localStrategy=require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');
var multipart= require('connect-multiparty');


mongoose.connect('mongodb://localhost/globalmedia');

require('./models/Audios');
require('./models/Banners');
require('./models/BannersApp');
require('./models/Controles');
require('./models/CamarasTrafico');
require('./models/Dispositivos');
require('./models/Estados');
require('./models/Estaciones');
require('./models/Grupos');
require('./models/Hits');
require('./models/HitsRecurso');
require('./models/HitsTrascendidos');
require('./models/InfoColaborador');
require('./models/Imagenes');
require('./models/ImgGaleria');
require('./models/Objetivos');
require('./models/modulosxusuario');
require('./models/Modulos');
require('./models/Notas');
require('./models/Personal');
require('./models/Podcast');
require('./models/Radio');
require('./models/Reportes');
require('./models/Secciones');
require('./models/Segmento');
require('./models/Status');
require('./models/Tags');
require('./models/tagsxnotas');
require('./models/tagsxpodcast');
require('./models/Tecnicos');
require('./models/Tematica');
require('./models/Unidades');
require('./models/Usuarios');
require('./models/VideoDenuncia');

var User=mongoose.model('Usuarios');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(require('prerender-node').set('prerenderServiceUrl', 'http://globalmedia.mx:8000/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 6000000 }}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view cache', false);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts')); // redirect CSS bootstrap
app.use('/node_modules', express.static(__dirname + '/node_modules/')); // redirect nodeModules
app.use('/bower_components', express.static(__dirname + '/bower_components/')); // redirect nodeModules
app.use('/views', express.static(__dirname + '/views/')); // redirect views

app.get('/rmx', function(req, res) {
  res.redirect('/#!/rmx');
});
app.get('/los40', function(req, res) {
  res.redirect('/#!/los40');
});
app.get('/wfm', function(req, res) {
  res.redirect('/#!/wfm');
});
app.get('/kebuena', function(req, res) {
  res.redirect('/#!/KeBuena');
});
app.get('/radioformula', function(req, res) {
  res.redirect('/#!/RadioFormula');
});
app.get('/radioformula', function(req, res) {
  res.redirect('/#!/RadioFormula');
});
app.get('/imagen', function(req, res) {
  res.redirect('/#!/Imagen');
});
app.get('/vivecanal', function(req, res) {
  res.redirect('/#!/ViveCanal');
});
app.get('/noticia/:id/:alias', function(req, res) {
  var alias=req.params.alias;
  res.redirect('/#!/Nota/'+alias);
});

app.get('/multimedia/colaboradores/:id', function(req, res) {
  var id=req.params.id;
  res.redirect('/images/multimedia/colaboradores/'+id);
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
