// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var colors = require('colors');

module.exports = function(grunt) {
	var _conf = grunt.file.readJSON('/etc/bitc/conf.json');
	
	grunt.initConfig({
		conf: _conf,
		
		shell: {
			options: {
				stdout: _conf.verbose,
				stderr: _conf.verbose,
				stdin: false,
				failOnError: true, // TODO: FIXME
			},
			apt: {
				command: _getAptCommand,
			},
		},
	});
	
	grunt.registerTask('bitc:setup', [
		'bitc:setup:log:start',
		'bitc:setup:apt',
	]);
	
	grunt.registerTask('bitc:setup:apt', [
		'bitc:setup:log:apt:start',
		'shell:apt',
		'bitc:setup:log:apt:end',
	]);
	
	grunt.loadTasks('../../../node_modules/grunt-shell/tasks');
	grunt.loadTasks('./tasks');
}

function _getAptCommand() {
	return [
		'apt-get update -y',
		'apt-get upgrade -y',
		['apt-get install -y', require('./apt-dependencies').join(' ')].join(' '),
	].join('&&');
}
