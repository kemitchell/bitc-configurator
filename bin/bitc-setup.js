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
	.option('-y, --yes', 'Skip all prompts and answer with the default. Without --server, --id and --ip are required')
	.option('--id <computerid>', 'Set the default computer ID. Most useful with --yes')
	.option('--ip <computerip>', 'Set the default computer IP. Most useful with --yes')
	.option('-a, --admin', 'Register the computer as an admin')
	.option('-v, --verbose', 'Show verbose output')

	.option('-c, --continue', 'Run all tasks after the network switching. You must be on the private network to use this. (Useful to skip the package manager commands)')

	// .option('--ascii', 'Show ASCII-art (technically ANSI-art) logo')
	.parse(process.argv);

if (argv.ascii) console.log(fs.readFileSync(require.resolve('../ascii-art.txt'), { encoding: 'utf8' }));

prompt.start();
prompt.message = '➥ ';
prompt.delimiter = '';
prompt.colors = false;

var options = {};
if (argv.continue) {
	options = api.thisComputer;
	options.verbose = argv.verbose;
	options.intranetOnly = true;
} else {
	options = {
		isServer: argv.server,
		yes: argv.yes,
		'continue': !!argv.yes ? 'Y' : undefined,
		computerID: argv.id,
		computerIP: argv.ip,
		isAdmin: argv.admin,
		verbose: argv.verbose,
		intranetOnly: false,
	};
}

prompt.override = {};
for (var key in options) {
	if (key != 'isAdmin' && key != 'isServer') prompt.override[key] = options[key];
	else prompt.override[key] = options[key] ? 'Y' : 'n';
}
prompt.override['passwordconfirm'] = prompt.override['password'];

setuputil.setUpComputer(options);
