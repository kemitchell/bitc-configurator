// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var navItems = require('./nav-items');

exports.addRoutes = function(app) {
	for (var path in exports.routes.paths) {
		if (path[0] != '/') continue;
		var method = 'get';
		if (exports.routes.methods[path]) method = exports.routes.methods[path].toLowerCase();
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

require('./dashboard')(exports.routes, exports.renderPage);
require('./api')(exports.routes, exports.renderPage);

var lessVariables = require('../public/includes/stylesheets/bootstrap-config');
exports.routes.callbacks.variables = function(req, res) {
	res.jsonp(200, lessVariables.vars);
}
exports.routes.paths['/includes/stylesheets/less.js'] = exports.routes.callbacks.variables;
