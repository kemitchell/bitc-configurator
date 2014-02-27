// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var colors = require('colors');
var exec = require('child_process').exec;
var api = require('../../../api');
var path = require('path');

/*
* Defines the following tasks:
* - bitc:setup:god
*/

module.exports = function(grunt) {
	var _conf = api.thisComputer;

	grunt.registerTask('bitc:setup:god', 'set up God (the daemon runner)', function() {
		if (!_conf.isServer) return;

		var allGodFiles = grunt.file.expand('../files/*.god');
		for (var fileIdx in allGodFiles) grunt.file.copy(allGodFiles[fileIdx], path.join('/etc/bitc/god/', path.basename(allGodFiles[fileIdx])));

		var godCommand = '/usr/local/bin/god -c /etc/bitc/god/bitc.god'
		var done = this.async();
		exec('(sudo crontab -l; echo "@reboot ' + godCommand + '") | uniq - | sudo crontab -', {
			timeout: 30000,
		}, function(error, stdout, stderr) {
			if (error) {
				grunt.fail.warn(error);
				done(false);
				return;
			}

			exec(godCommand, {
				timeout: 30000,
			}, function(error, stdout, stderr) {
				if (error) {
					grunt.fail.warn(error);
					done(false);
					return;
				}

				grunt.log.writeln('God successfully configured and started').ok();
				done();
			});
		});
	});
}
