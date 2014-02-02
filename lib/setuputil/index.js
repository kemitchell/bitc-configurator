// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var api = require('../api');
var prompt = require('prompt');
var async = require('async');
var util = require('util');
var colors = require('colors');
var fs = require('fs');

exports.setUpComputer = function(alwaysYes, isServer) {
	console.log('Setting up computer...'.green);
	
	exports.checkForInternet(function(hasInternetConnection) {
		if (!hasInternetConnection) {
			console.log('No Internet connection found! Please connect to the Internet and try again.'.red);
			process.exit(1);
		}
		
		exports.prompts(isServer, function(options) {
			
		});
		
		async.parallel([
			// exports.prompts,
			exports.apt,
		]);
	});
}

exports.checkForInternet = function(callback) {
	console.log('Checking for Internet...'.grey);
	require('dns').resolve('google.com', function(err) {
		callback(!err);
	});
}

exports.prompts = function(isServer, callback) {
	prompt.get([
		{
			name: 'computerid',
			description: 'What should the computer ID be?',
			type: 'string',
			pattern: /^[-a-zA-Z0-9]+$/,
			required: true,
		},
		{
			name: 'computerip',
			description: 'What should the computer\'s IP be?',
			type: 'string',
			pattern: isServer ? /^10\.3\.14\.1$/ : /^(10\.3\.14\.([5-9]|[1-9][0-9]|1[1-4][0-9]|150))$/,
			message: isServer ? 'The server IP address must be 10.3.14.1' : 'The IP address must be in the 10.3.14.[5-150] range.',
			default: '10.3.14.1',
			required: true,
		},
		{
			name: 'computerisadmin',
			description: 'Is this computer for a BITC teacher or administrator [Y/n]?',
			type: 'string',
			required: false,
		},
		{
			name: 'username',
			description: 'What is the normal login username?',
			type: 'string',
			pattern: /^([a-z_][a-z0-9_]{0,30})$/,
			message: 'That is an invalid username.',
			required: true,
		},
		{
			name: 'password',
			description: 'What should the normal login password be set to?',
			type: 'string',
			hidden: true,
			required: true,
		},
		{
			name: 'passwordconfirm',
			description: 'Confirm the password or leave blank to skip',
			type: 'string',
			hidden: true,
			message: 'The passwords did not match.',
			default: 'ThisWillBeReplacedAutomagicallyWithTheOriginalValueSoPeopleCanSkipTheConfirmationIfTheyAreLazy',
			conform: function(value) {
				return value == 'ThisWillBeReplacedAutomagicallyWithTheOriginalValueSoPeopleCanSkipTheConfirmationIfTheyAreLazy' || value == prompt.history('password').value;
			},
			required: true,
		}
	], function(err, result) {
		if (!result) return;
		
		result.computerid = result.computerid.toUpperCase();
		
		console.log(result);
		console.log(err);
	});
}

exports.apt = function() {
	console.log('Updating packages...'.grey);
}
