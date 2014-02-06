// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var api = require('../api');
var promptItems = require('./prompts');
var prompt = require('prompt');
var async = require('async');
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
	console.log('Setting up computer...'.green);
	
	exports.checkForInternet(function(hasInternetConnection) {
		if (!hasInternetConnection) {
			console.log('No Internet connection found! Please connect to the Internet and try again.'.red);
			process.exit(1);
		}
		console.log('Found Internet connection.'.green);
		
		exports.prompts(cmdOptions, exports._performSetUp);
	});
}

exports._performSetUp = function(options) {
	console.log(options);
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
			computerID: result.computerid.toUpperCase(),
			computerIP: result.computerip ? result.computerip : '10.0.0.1',
			isServer: !!cmdOptions.isServer,
			username: result.username,
			password: result.password,
			isAdmin: (result.computerisadmin == 'Y'),
		};
		
		callback(options);
	});
}
exports.apt = function() {
	console.log('Updating packages...'.grey);
}
