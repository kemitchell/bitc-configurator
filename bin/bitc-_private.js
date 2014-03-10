#!/usr/bin/env node
// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var api = require('../lib/api');
var cmd = require('commander').version(api.version);
var _ = require('underscore');

cmd.command('tmux-status-right', 'Get the text that shows up on the right side of tmux status bar');

cmd.command('grunt').description('Run a specific grunt task (from the setup Gruntfile)')
	.option('-v, --verbose', 'Make grunt run verbosely')
	.action(function() {
		var verbose = !!(_.last(arguments).verbose);
		var task = arguments[0];
		if (!_.isString(task)) {
			console.error('Error: you must specify a task!');
			process.exit(1);
			return;
		}

		api.runGruntTask(task, verbose);
		process.exit(0);
	});

var argv = cmd.parse(process.argv);
