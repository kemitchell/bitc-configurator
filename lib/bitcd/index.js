// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var express = require('express');
var api = require('../api');

var http = require('http');
var path = require('path');

var routes = require('./routes');

exports.createServer = function(opts, callback) {
	var app = express();

	// all environments
	app.set('port', opts.port || process.env.PORT || 9000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	app.set('brand name', 'BITC');

	app.configure(function() {
		app.use(express.favicon());
		app.use(express.logger('dev'));
		routes.configure(app);
		if (opts.username && opts.password) app.use(express.basicAuth(opts.username, opts.password));
		app.use(express.json());
		app.use(express.urlencoded());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(path.join(__dirname, 'public')));
	});

	app.configure('development', function() {
		app.use(express.errorHandler());
		app.locals.pretty = true;
	});

	routes.addRoutes(app);

	http.createServer(app).listen(app.get('port'), callback);
}
