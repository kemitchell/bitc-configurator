#!/usr/bin/env node
// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var api = require('../lib/api');
var setuputil = require('../lib/setuputil');
var prompt = require('prompt');
var fs = require('fs');
var cmd = require('commander').version(api.version);
cmd.option('-s, --server', 'Set up as server');
cmd.option('-y, --yes', 'Skip all prompts and answer with the default. Without --server, --id and --ip are required');
cmd.option('--id <computerid>', 'Set the default computer ID. Most useful with --yes');
cmd.option('--ip <computerip>', 'Set the default computer IP. Most useful with --yes');
cmd.option('-a, --admin', 'Register the computer as an admin');
cmd.option('-v, --verbose', 'Show verbose output');

cmd.option('-c, --continue', 'Run all tasks after the network switching. You must be on the private network to use this. (Useful to skip the package manager commands)');

// cmd.option('--ascii', 'Show ASCII-art (technically ANSI-art) logo');

cmd.command('desktop', 'Configure some miscellaneous Ubuntu Desktop things, such as the launcer and disabling autolock').action(function() {
	api.runGruntTask('bitc:dconf', argv.verbose);
	process.exit(0);
});

var argv = cmd.parse(process.argv);

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
