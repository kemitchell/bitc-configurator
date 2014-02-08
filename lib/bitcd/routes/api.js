// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

module.exports = function(routes, renderPage) {
	routes.callbacks.api = {};
	
	routes.callbacks.api.registerComputer = function(req, res) {
		res.json({
			hi: true
		});
	}
	
	routes.paths['/api/1/registerComputer'] = routes.callbacks.api.registerComputer;
	routes.methods['/api/1/registerComputer'] = 'post';
}