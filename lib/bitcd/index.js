// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var express = require('express');
var api = require('../api');

var http = require('http');
var path = require('path');

exports.createServer = function(opts, callback) {
	var app = express();

	var routes = require('./routes');
	var user = require('./routes/user');

	// all environments
	app.set('port', opts.port || process.env.PORT || 9000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	
	app.configure(function() {
		app.use(express.favicon());
		app.use(express.logger('dev'));
		if (opts.username && opts.password) app.use(express.basicAuth(opts.username, opts.password));
		app.use(express.json());
		app.use(express.urlencoded());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(path.join(__dirname, 'public')));
	});
	
	app.configure('development', function() {
		app.use(express.errorHandler);
	});
	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	app.get('/', routes.index);
	app.get('/users', user.list);
	
	http.createServer(app).listen(app.get('port'), callback);
}
