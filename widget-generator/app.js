
/**
 * Module dependencies.
 */

var express = require('express');
var mustacheExpress = require('mustache-express');
var http = require('http');
var path = require('path');
var app = express();
var routes = require('./routes')(app);

var viewsDirectory = path.join(__dirname, 'views');
app.engine('html', mustacheExpress(path.join(viewsDirectory, 'partials'), '.html'));
// all environments
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.set('views', viewsDirectory);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
