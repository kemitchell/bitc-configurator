#!/usr/bin/env node
// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var api = require('../lib/api');
var setuputil = require('../lib/setuputil');
var prompt = require('prompt');
var fs = require('fs');
var argv = require('commander')
	.version(api.version)
	.option('-s, --server', 'Set up as server')
	.option('-y, --yes', 'Answer yes to all confirm prompts')
	.option('--ascii', 'Show ASCII-art (technically ANSI-art) logo')
	.parse(process.argv);
	
if (argv.ascii) console.log(fs.readFileSync(require.resolve('../ascii-art.txt'), { encoding: 'utf8' }));

prompt.start();
prompt.message = '➥ ';
prompt.delimiter = '';
prompt.colors = false;

if (argv.yes) {
	console.log('Are you sure you want to set up this computer [Y/n]? Y');
	
	setuputil.setUpComputer(argv.yes, argv.server);
} else {
	prompt.get([
		{
			name: 'continue',
			description: 'Are you sure you want to set up this computer [Y/n]?',
			type: 'string',
			required: false,
		}
	], function(err, result) {
		if (!result || result.continue != 'Y') process.exit(1);
		
		setuputil.setUpComputer(argv.yes);
	});
}
