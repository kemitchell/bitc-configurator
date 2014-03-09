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
* - bitc:tmux
* - bitc:mutevolume
*/

module.exports = function(grunt) {
	var _conf = api.thisComputer;

	grunt.registerTask('bitc:tmux', 'set up tmux', function() {
		grunt.file.copy('../files/tmux.conf', '/etc/tmux.conf');
	});

	grunt.registerTask('bitc:mutevolume', 'mute speakers', function() {
		if (_conf.isServer) return;

		var done = this.async();
		exec('amixer -D pulse sset Master mute', {
			timeout: 30000,
		}, function(error, stdout, stderr) {
			if (error) grunt.log.writeln('Warning: failed to mute speakers.'.yellow);

			done();
		});
	});
}
