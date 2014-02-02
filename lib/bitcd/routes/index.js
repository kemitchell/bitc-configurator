// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var navitems = require('./nav-items');

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
			items: navitems,
			activepath: req.path,
			brandname: req.app.get('brand name'),
		},
		pagetitle: navitems[req.path] ? navitems[req.path] : '',
	};
	for (var attrname in args) { if (attrname != 'nav') actualArgs[attrname] = args[attrname]; };
	res.render(view, actualArgs);
}

exports.routes = {
	callbacks: {},
	paths: {},
	methods: {},
};

exports.routes.callbacks.index = function(req, res) {
	exports.renderPage(req, res, 'index');
};
exports.routes.paths['/'] = exports.routes.callbacks.index;

