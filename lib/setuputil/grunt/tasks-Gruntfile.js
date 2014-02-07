// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var colors = require('colors');

module.exports = function(grunt) {
	grunt.initConfig({
		conf: grunt.file.readJSON('/etc/bitc/conf.json'),
		
		shell: {
			options: {
				stdout: false,
				stderr: false,
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
	
	grunt.registerTask('bitc:setup:log:start', 'logging', function() {
		grunt.log.write('Grunt loaded\n'.grey).ok();
	});
	
	grunt.registerTask('bitc:setup:log:apt:start', 'logging', function() {
		grunt.log.write('Updating and installing packages...\n'.grey).ok();
	});
	grunt.registerTask('bitc:setup:log:apt:end', 'logging', function() {
		grunt.log.write('Finished updating and installing packages.\n'.green).ok();
	});
	grunt.registerTask('bitc:setup:apt', [
		'bitc:setup:log:apt:start',
		'shell:apt',
		'bitc:setup:log:apt:end',
	]);
	
	grunt.loadTasks('../../../node_modules/grunt-shell/tasks');
}

function _getAptCommand() {
	return [
		'apt-get update -y',
		'apt-get upgrade -y',
		['apt-get install -y', require('./apt-dependencies').join(' ')].join(' '),
	].join('&&');
}
