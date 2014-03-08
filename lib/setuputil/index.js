// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var api = require('../api');
var promptItems = require('./prompts');
var tasks = require('./tasks');
var prompt = require('prompt');
var util = require('util');
var colors = require('colors');
var fs = require('fs');

/*
	options = {
		computerID: result.computerid.toUpperCase(),
		computerIP: result.computerip,
		isServer: isServer,
		username: result.username,
		password: result.password,
		isAdmin: result.computerisadmin,
	}
 */

exports.setUpComputer = function(cmdOptions) {
	exports.checkForRoot(function(isRoot) {
		if (!isRoot) {
			console.log('This process is not running as root! Please try again with sudo or the like.'.red);
			process.exit(1);
		}
		console.log('Running as root'.green);

		exports.checkForInternet(function(hasInternetConnection) {
			if (!cmdOptions.intranetOnly && !hasInternetConnection) {
				console.log('No Internet connection found! Please connect to the Internet and try again.'.red);
				process.exit(1);
			} else if (cmdOptions.intranetOnly && hasInternetConnection) {
				console.log('Internet connection found, but run with --continue. Please connect to the intranet and try again.'.red);
				process.exit(1);
			}
			console.log(('Found ' + (cmdOptions.intranetOnly ? 'intranet' : 'Internet') + ' connection.').green);

			exports.prompts(cmdOptions, _performSetUp);
		});
	});
}

function _performSetUp(options) {
	console.log('Preparing to set up computer with the following values:'.green);
	console.log('  Computer ID: ' + options.computerID);
	console.log('  Computer IP: ' + options.computerIP);
	console.log('  Is server? ' + (options.isServer ? 'yes' : 'no'));
	console.log('  Is admin? ' + (options.isAdmin ? 'yes' : 'no'));
	console.log('  Username: ' + options.username);
	console.log('  Password: ' + options.password);

	prompt.get([
		{
			name: 'continue',
			description: 'Are you sure you want to set up this computer [Y/n]?',
			type: 'string',
			required: false,
		}
	], function(err, result) {
		if (!result || result.continue != 'Y') process.exit(1);

		console.log('Setting up computer...'.green);
		if (!options.intranetOnly) console.log('This process will mostly survive without user interaction, however monitoring is recommended. \
When the necessary packages are done downloading, you will be asked to switch the network connection to the intranet.');
		console.log('');

		tasks.performSetUp(options);
	});
}

exports.checkForRoot = function(callback) {
	console.log('Checking running as root...'.grey);
	callback(process.getuid() == 0);
}
exports.checkForInternet = function(callback) {
	console.log('Checking for Internet...'.grey);
	require('dns').resolve('google.com', function(err) {
		callback(!err);
	});
}
exports.prompts = function(cmdOptions, callback) {
	if (cmdOptions.yes) {
		var defaults = promptItems.getDefaults(cmdOptions.isServer);
		for (var promptID in defaults) prompt.override[promptID] = defaults[promptID];
		for (var optionID in cmdOptions) prompt.override[optionID] = cmdOptions[optionID];
	}

	var _prompts = promptItems.prompts(cmdOptions.isServer);
	prompt.get(_prompts, function(err, result) {
		if (!result) return;

		options = {
			computerID: result.computerID.toUpperCase(),
			computerIP: result.computerIP ? result.computerIP : '10.0.0.1',
			isServer: !!cmdOptions.isServer,
			username: result.username,
			password: result.password,
			isAdmin: (result.isAdmin == 'Y'),
			verbose: cmdOptions.verbose,
			intranetOnly: cmdOptions.intranetOnly,
		};

		callback(options);
	});
}
