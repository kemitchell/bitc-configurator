#!/usr/bin/env node
// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var util = require('util');
var api = require('../lib/api');
var cmd = require('commander').version(api.version);
var argv = cmd.parse(process.argv);

if (cmd.args.length != 1) {
	console.error('Error: you must have one and only one argument: the computer to log in to');
	process.exit(1);
}

if (!api.thisComputer.isAdmin) {
	console.error('Error: only admins can log in to other computers');
	process.exit(1);
}
