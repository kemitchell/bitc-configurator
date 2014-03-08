#!/usr/bin/env node
// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var api = require('../lib/api');
var cmd = require('commander').version(api.version);

cmd.command('setup', 'Set up this computer for BITC');
cmd.command('server', 'Run the server');

cmd.command('internet').description('Switch the network config to the World Wide Web').action(_gruntAsRoot('bitc:switchnetwork:internet'));
cmd.command('intranet').description('Switch the network config to the private network').action(_gruntAsRoot('bitc:switchnetwork:intranet'));

cmd.command('_private', 'Utilized by various scripts, but shouldn\'t be run manually');

var argv = cmd.parse(process.argv);

if (process.argv.length == 2) {
	console.error('Error: no command specified!');
	process.exit(1);
}

function _gruntAsRoot(task) {
	return function() {
		if (process.getuid() != 0) {
			console.error('This must be run as root!');
			process.exit(1);
		}

		api.runGruntTask(task);
		process.exit(0);
	};
}
