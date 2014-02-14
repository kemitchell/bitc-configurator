// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var fs = require('fs');

module.exports = function(routes, renderPage) {
	routes.callbacks.api = {};
	
	routes.callbacks.api.registerComputer = function(req, res) {
		if (req.locals.registered) {
			res.json(403, {
				error: 'That computer is already registered.',
			});
			return;
		}
		if (!req.body || !req.body.computerID || !req.body.computerIP) {
			res.json(400, {
				error: 'The request is malformed.',
			});
			return;
		}
		if (req.body.computerIP != req.ip) {
			res.json(400, {
				error: 'The request is malformed. (The given computer IP is not the same as the requester\'s IP.)',
			});
			return;
		}
		
		var fileData = JSON.stringify(req.body, null, 4); // Yeah, yeah, this is probably a security hole, but the dang thing isn't accessible to the Internet
		fs.writeFile('/etc/bitc/computers/' + req.ip + '.json', fileData, function(err) {
			if (err) return next(err);
			
			res.json(201, req.body);
		});
	}
	
	routes.callbacks.api.getAuthorizedKeys = function(req, res) {
		res.sendfile('/etc/bitc/ssh/authorized_keys');
	}
	routes.callbacks.api.getGlobalKey = function(req, res) { // access is limited by the adminOnly middleware
		res.sendfile('/etc/bitc/ssh/globalKey');
	}
	routes.callbacks.api.getGlobalPublicKey = function(req, res) {
		res.sendfile('/etc/bitc/ssh/globalKey.pub');
	}
	
	routes.paths['/api/1/registerComputer'] = routes.callbacks.api.registerComputer; routes.methods['/api/1/registerComputer'] = 'POST';
	routes.paths['/api/1/getAuthorizedKeys'] = routes.callbacks.api.getAuthorizedKeys;
	routes.paths['/api/1/getGlobalKey'] = routes.callbacks.api.getGlobalKey; routes.adminOnly['/api/1/getGlobalKey'] = true;
	routes.paths['/api/1/getGlobalKey.pub'] = routes.callbacks.api.getGlobalPublicKey;
}
