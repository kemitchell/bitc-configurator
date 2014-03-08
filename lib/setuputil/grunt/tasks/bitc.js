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
* - bitc:setup:bitc:{client,server,shared}
* - bitc:switchnetwork
*/

module.exports = function(grunt) {
	var _conf = api.thisComputer;

	grunt.registerTask('bitc:setup:client', 'set up BITC client', function() {
		grunt.log.writeln('FIXME: dummy bitc:setup:client task\n'.red).ok();

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
		grunt.log.writeln('FIXME: dummy bitc:setup:server task\n'.red).ok();
	});
	grunt.registerTask('bitc:setup:shared', 'set up miscellaneous configs', function() {
		grunt.file.copy('../files/tmux.conf', '/etc/tmux.conf');
	});

	grunt.registerTask('bitc:switchnetwork', 'switch to Intranet', function() {
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

				grunt.log.writeln('Network successfully configured. Please do not switch back to the Internet.').ok();
				grunt.log.writeln('Continuing setup...').ok();
				done();
			});
		});
	});

	grunt.registerTask('bitc:fixnode', [ // This must be run before `bitc:fixnode:preexit`
		'bitc:fixnode:removeaptnpm',
		'bitc:fixnode:installnpm',
		'bitc:fixnode:installnode',
	]);
	grunt.registerTask('bitc:fixnode:preexit', ['bitc:fixnode:removeaptnode']); // This must be run as the final task
	grunt.registerTask('bitc:fixnode:removeaptnpm', ['shell:aptremovenpm']);
	grunt.registerTask('bitc:fixnode:removeaptnode', ['shell:aptremovenode']);
	grunt.registerTask('bitc:fixnode:installnpm', 'install npm and n', function() {
		var done = this.async();

		npm.load({
			global: true,
			production: true,
		}, function (err) {
			if (err) {
				grunt.fail.fatal(err);
				done(err);
				return;
			}

			npm.commands.install(['npm', 'n@1.2.x'], function (err, data) {
				if (err) {
					grunt.fail.fatal(err);
					done(err);
					return;
				}

				done();
			});
			npm.on('log', function (message) {}); // noop
		});
	});
	grunt.registerTask('bitc:fixnode:installnode', 'install node with n', function() {
		var done = this.async();

		exec('n stable', { // It will overwrite any existing files at /usr/local/bin/node and /usr/local/bin/npm
			timeout: 30000,
		}, function(error, stdout, stderr) {
			if (error) {
				grunt.fail.warn('Failed to install the latest stable version of node.', error.code);
				done(false);
				return;
			}

			done();
		});
	});
}
