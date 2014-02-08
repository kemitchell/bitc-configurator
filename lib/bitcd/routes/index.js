// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var navItems = require('./nav-items');

exports.addRoutes = function(app) {
	for (var path in exports.routes.paths) {
		if (path[0] != '/') continue;
		var method = 'get';
		if (exports.routes.methods[path]) method = exports.routes.methods[path];
		app[method](path, exports.routes.paths[path]);
	}
}

exports.renderPage = function(req, res, view, args) {
	var actualArgs = {
		nav: {
			items: navItems,
			activepath: req.path,
			brandname: req.app.get('brand name'),
		},
		includes: { // Don't put anything here! It will be overwritten by callbacks˜
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
};

var dashboardRoutes = require('./dashboard');
dashboardRoutes(exports.routes, exports.renderPage);
// exports.routes.paths['/api'] = exports.routes.callbacks.api.index;
// exports.routes.paths['/api/1'] = exports.routes.callbacks.api.1.index;

var lessVariables = require('../public/includes/stylesheets/bootstrap-config');
exports.routes.callbacks.variables = function(req, res) {
	res.jsonp(200, lessVariables.vars);
}
exports.routes.paths['/includes/stylesheets/less.js'] = exports.routes.callbacks.variables;
