#!/usr/bin/env node
// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var server = require('../lib/bitcd');
var argv = require('optimist')
	.describe('port', 'The port to listen on').alias('port', 'p').default('port', process.env.port || 9000)
	.describe('username', 'Basic auth username').alias('username', 'user')
	.describe('password', 'Basic auth password').alias('password', 'pass')
	.argv;

server.createServer(argv, function() {
	console.log('[BITCd] Listening on port %d with options %j', argv.port, argv);
});
