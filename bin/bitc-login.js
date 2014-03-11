#!/usr/bin/env node
// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var util = require('util');
var api = require('../lib/api');
var request = require('request');

var cmd = require('commander').version(api.version);
var argv = cmd.parse(process.argv);
var computerID = cmd.args[0];

if (cmd.args.length != 1) {
	console.error('Error: you must have one and only one argument: the computer to log in to');
	process.exit(1);
}

if (!api.thisComputer.isAdmin) {
	console.error('Error: only admins can log in to other computers');
	process.exit(1);
}

request('http://10.0.0.1/api/1/computers/byID', {
	json: true,
}, function(error, response, body) {
	if (error || response.statusCode == 200 || body.error) {
		console.error('Error: failed to load computers');
		process.exit(1);
		return;
	}

	if (!body[computerID] || !body[computerID].computerIP) {
		console.error('Error: no registered computer has that ID');
		process.exit(1);
		return;
	}

	console.log(body[computerID].computerIP);
	process.exit(0);
});
