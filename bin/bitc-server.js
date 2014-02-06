#!/usr/bin/env node
// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var util = require('util');
var server = require('../lib/bitcd');
var api = require('../lib/api');
var argv = require('commander')
	.version(api.version)
	.option('-p, --port <port>', 'The port to listen on', parseInt, process.env.port || 9000)
	.option('--user, --username <password>', 'Basic auth username')
	.option('--pass, --password <password>', 'Basic auth password')
	.parse(process.argv);

var options = {
	port: argv.port,
	username: argv.username,
	password: argv.password,
};

server.createServer(options, function() {
	console.log('[BITCd] Listening on port %d with options %s', argv.port, util.inspect(options, { colors: true }));
});
