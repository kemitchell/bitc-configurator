// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var api = require('../api');
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

exports.setUpComputer = function(alwaysYes, isServer) {
	console.log('Setting up computer...'.green);
	
	exports.checkForInternet(function(hasInternetConnection) {
		if (!hasInternetConnection) {
			console.log('No Internet connection found! Please connect to the Internet and try again.'.red);
			process.exit(1);
		}
		console.log('Found Internet connection.'.green);
		
		exports.prompts(isServer, function(options) {
			exports._performSetUp(options);
		});
	});
}

exports._performSetUp = function(options) {
	console.log(options);
	
	async.parallel
}


exports.checkForInternet = function(callback) {
	console.log('Checking for Internet...'.grey);
	require('dns').resolve('google.com', function(err) {
		callback(!err);
	});
}
exports.prompts = function(isServer, callback) {
	var prompts = [
		{
			name: 'computerid',
			description: 'What should the computer ID be?',
			type: 'string',
			pattern: /^[-a-zA-Z0-9]+$/,
			default: isServer ? 'BITC-SERVER' : undefined,
			required: true,
		},
	];
	
	if (!isServer) prompts.push(
		{
			name: 'computerip',
			description: 'What should the computer\'s IP be (10.3.14.[5-150])?',
			type: 'string',
			pattern: isServer ? /^10\.3\.14\.1$/ : /^(10\.3\.14\.([5-9]|[1-9][0-9]|1[1-4][0-9]|150))$/,
			message: isServer ? 'The server IP address must be 10.3.14.1' : 'The IP address must be in the 10.3.14.[5-150] range.',
			required: true,
		},
		{
			name: 'computerisadmin',
			description: 'Is this computer for a BITC teacher or administrator [Y/n]?',
			type: 'string',
			default: 'n',
			required: false,
		}
	);
	
	prompts.push(
		{
			name: 'username',
			description: 'What is the normal login username?',
			type: 'string',
			pattern: /^([a-z_][a-z0-9_]{0,30})$/,
			message: 'That is an invalid username.',
			default: 'bitc',
			required: true,
		},
		{
			name: 'password',
			description: 'What should the normal login password be set to?',
			type: 'string',
			hidden: false,
			default: 'password',
			required: true,
		},
		{
			name: 'passwordconfirm',
			description: 'Confirm the password or leave blank to skip',
			type: 'string',
			hidden: true,
			message: 'The passwords did not match. Please restart the process (^C) and try again.',
			default: 'ThisWillBeReplacedAutomagicallyWithTheOriginalValueSoPeopleCanSkipTheConfirmationIfTheyAreLazy',
			conform: function(value) {
				return value == 'ThisWillBeReplacedAutomagicallyWithTheOriginalValueSoPeopleCanSkipTheConfirmationIfTheyAreLazy' || value == prompt.history('password').value;
			},
			required: true,
		}
	);
	
	prompt.get(prompts, function(err, result) {
		if (!result) return;
		
		options = {
			computerID: result.computerid.toUpperCase(),
			computerIP: result.computerip ? result.computerip : '10.3.14.1',
			isServer: !!isServer,
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
