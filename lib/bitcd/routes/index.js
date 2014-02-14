// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var navItems = require('./nav-items');
var fs = require('fs');

exports.addRoutes = function(app) {
	for (var path in exports.routes.paths) {
		if (path[0] != '/') continue;
		var method = 'get';
		if (exports.routes.methods[path]) method = exports.routes.methods[path].toLowerCase();
		
		var routeCallbacks = [exports.routes.paths[path]];
		app[method](path, routeCallbacks);
	}
}

exports.configure = function(app) {
	app.use(exports.routes.callbacks._computerInfo);
}

exports.renderPage = function(req, res, view, args) {
	var actualArgs = {
		nav: {
			items: navItems,
			activepath: req.path,
			brandname: req.app.get('brand name'),
		},
		includes: { // Don't put anything here! It will be overwritten by callbacks
			stylesheets: [],
			javascripts: [],
		},
		pagetitle: navItems[req.path] ? navItems[req.path] : '',
	};
	for (var attrname in args) { if (attrname != 'nav') actualArgs[attrname] = args[attrname]; };
	res.render(view, actualArgs);
}

exports.routes = {
	callbacks: {},
	paths: {},
	methods: {},
	adminOnly: {},
};

require('./dashboard')(exports.routes, exports.renderPage);
require('./api')(exports.routes, exports.renderPage);

var lessVariables = require('../public/includes/stylesheets/bootstrap-config');
exports.routes.callbacks.variables = function(req, res) {
	res.jsonp(200, lessVariables.vars);
}
exports.routes.paths['/includes/stylesheets/less.js'] = exports.routes.callbacks.variables;

exports.routes.callbacks._computerInfo = function(req, res, next) {
	var pathIsRestricted = (exports.routes.adminOnly[req.path]);
	
	var computerInfo = ('/etc/bitc/computers/' + req.ip + '.json');
	if (req.ip == '127.0.0.1' || req.ip == '10.0.0.1') computerInfo = '/etc/bitc/conf.json';
	fs.readFile(computerInfo, {
		encoding: 'utf8',
	}, function(err, data) {
		if (err) {
			if (pathIsRestricted) {
				res.json(403, {
					error: 'That computer is not registered.',
				});
				return;
			}
		
			res.locals.computerInfo = {
				unregistered: true,
				computerIP: req.ip,
			};
			next();
			return;
		}
		
		computerInfo = JSON.parse(data);
	
		if (pathIsRestricted && computerInfo.isServer) {
			res.json(403, {
				error: 'Servers are not allowed access to that resource.',
			});
			return;
		} else if (pathIsRestricted && !computerInfo.isAdmin) {
			res.json(403, {
				error: 'Only admins have access to that resource.',
			});
			return;
		}
	
		computerInfo.registered = true;
		res.locals.computerInfo = computerInfo;
		next();
	});
}
