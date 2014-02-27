// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var fs = require('fs');
var _ = require('underscore');

var _confKeys = [
	'computerID',
	'computerIP',
	'isServer',
	'isAdmin',
	'username',
	'password',
];

var _cache = {}; // IP (or '_thisComputer') => ComputerConfig

module.exports = exports = function(computerIP) {
	if (_cache[computerIP ? computerIP : '_thisComputer']) return _cache[computerIP ? computerIP : '_thisComputer'];

	var filename = ('/etc/bitc/' + (computerIP ? ('computers/' + computerIP + '.json') : 'conf.json'));
	var computerConfig = {
		registered: false,
		computerIP: computerIP, // TODO: this will be undefined for the current computer
	};
	if (fs.existsSync(filename)) {
		computerConfig = require(filename);
		computerConfig.registered = true;
	}

	computerConfig._filename = filename;

	computerConfig.setToObject = function(object) {
		console.log('Object:', object);
		for (var keyIdx in _confKeys) { var key = _confKeys[keyIdx]; if (object[key]) computerConfig[key] = object[key]; }
		console.log('This:', computerConfig);
		return computerConfig;
	}

	computerConfig.saveChanges = function(callback) {
		console.log('Writing this:', computerConfig);
		var newObject = {};
		for (var keyIdx in _confKeys) { var key = _confKeys[keyIdx]; newObject[key] = computerConfig[key]; }

		console.log('Wrote this:', newObject);
		return fs.writeFile(computerConfig._filename, JSON.stringify(newObject, null, 4), callback);
	}

	return (_cache[computerIP ? computerIP : '_thisComputer'] = computerConfig);
}

module.exports.getAllIPs = function(callback) {
	fs.readdir('/etc/bitc/computers', function(err, files) {
		if (err) callback(err);
		callback(null, _.chain(files).filter(function(filename) {
			return filename.hasSuffix('.json');
		}).map(function(filename) {
			return filename.replace('.json', '');
		}).value());
	});
}

String.prototype.hasSuffix = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
