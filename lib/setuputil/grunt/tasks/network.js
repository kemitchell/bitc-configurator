// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var colors = require('colors');
var request = require('request');
var prompt = require('prompt');
var exec = require('child_process').exec;
var api = require('../../../api');
var gruntfile = require('../Gruntfile');
var npm = require('npm');

/*
* Defines the following tasks:
* - bitc:switchnetworkprompt
* - bitc:switchnetwork:{intranet,internet}
*/

module.exports = function(grunt) {
	var _conf = api.thisComputer;

	grunt.registerTask('bitc:switchnetworkprompt', 'prompt to switch to Intranet', function() {
		var done = this.async();

		prompt.get([
			{
				name: 'switchnetwork',
				description: ('Please switch the network connection to the Intranet and press return to continue.' + (!_conf.isServer ? ' DO NOT CONTINUE UNLESS THE SERVER IS SET UP AND TURNED ON!' : '')),
				type: 'string',
				required: false,
			}
		], function(err, result) {
			if (err) return;
			done();
		});
	});
	grunt.registerTask('bitc:switchnetwork:intranet', 'switch to intranet', function() {
		var done = this.async();

		grunt.log.writeln('Setting up network config...');
		grunt.file.copy('../files/interfaces', '/etc/network/interfaces', {
			process: gruntfile.fileContentsProcessor,
		});

		exec('ifdown eth0; ifup eth0', { // On the desktop eth0 isn't up by default (it is set up by NetworkManager), so use the semicolon to ignore the error. It might exist, though, if this has already been run, so just ignore it
			timeout: 30000,
		}, function(error, stdout, stderr) {
			if (error) {
				grunt.fail.warn('Failed to restart network.', error.code);
				done(false);
				return;
			}

			grunt.log.writeln('Network successfully configured. Please do not switch back to the Internet without running `bitc internet`.').ok();
			grunt.log.writeln('Continuing setup...').ok();
			done();
		});
	});
	grunt.registerTask('bitc:switchnetwork:internet', 'switch to Internet', function() {
		var done = this.async();

		grunt.log.writeln('Setting up network config...');
		grunt.file.copy('../files/interfaces-internet', '/etc/network/interfaces', {
			process: gruntfile.fileContentsProcessor,
		});

		exec('ifdown eth0; ifup eth0', { // On the desktop eth0 isn't up by default (it is set up by NetworkManager), so use the semicolon to ignore the error. It might exist, though, if this has already been run, so just ignore it
			timeout: 30000,
		}, function(error, stdout, stderr) {
			if (error) {
				grunt.fail.warn('Failed to restart network.', error.code);
				done(false);
				return;
			}

			grunt.log.writeln('Network successfully configured. Please do not switch back to the intranet without running `bitc intranet`.').ok();
			grunt.log.writeln('Continuing setup...').ok();
			done();
		});
	});
}
