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
* - bitc:setup:bitc
* - bitc:setup:bitc:{client,server,shared}
*/

module.exports = function(grunt) {
	var _conf = api.thisComputer;

	grunt.registerTask('bitc:setup:bitc', [
		'bitc:setup:shared',
		_conf.isServer ? 'bitc:setup:server' : 'bitc:setup:client',
	]);

	grunt.registerTask('bitc:setup:shared', 'set up BITC on both client and server', function() {
	});

	grunt.registerTask('bitc:setup:client', 'set up BITC client', function() {
		var done = this.async();
		request.post('http://10.0.0.1:9000/api/1/registerComputer', {
			form: _conf,
			json: true,
		}, function(error, response, body) {
			if (error) {
				grunt.fail.fatal(error);
				done(false);
				return;
			}

			if (response.statusCode == 403) {
				grunt.log.writeln('Warning: this computer is already registered.'.yellow);
				done();
				return;
			}

			if (response.statusCode != 201) {
				grunt.fail.fatal('/api/1/registerComputer returned status code ' + response.statusCode + ', should be 201 Created.');
				done(false);
				return;
			}
			if (body.error) {
				grunt.fail.fatal('/api/1/registerComputer returned error "' + body.error + '", but status code 201.');
				done(false);
				return;
			}

			done();
		});
	});

	grunt.registerTask('bitc:setup:server', 'set up BITC server', function() {
		grunt.file.mkdir('/etc/bitc/computers');
		grunt.file.copy('/etc/bitc/conf.json', '/etc/bitc/computers/10.0.0.1.json');
	});
}
