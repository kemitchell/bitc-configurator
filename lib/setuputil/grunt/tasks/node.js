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
* - bitc:fixnode
* - bitc:fixnode:{removeaptnpm,installnpm,installnode}
*/

module.exports = function(grunt) {
	var _conf = api.thisComputer;

	grunt.registerTask('bitc:fixnode', [ // This must be run before `bitc:fixnode:preexit`
		'bitc:fixnode:removeaptnpm',
		'bitc:fixnode:installnpm',
		'bitc:fixnode:installnode',
	]);

	grunt.registerTask('bitc:fixnode:removeaptnpm', ['shell:aptremovenpm']);

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
