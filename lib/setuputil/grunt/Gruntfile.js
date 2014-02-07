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
			aptupdate: {
				command: 'apt-get update -y',
			},
			aptupgrade: {
				command: 'apt-get upgrade -y',
			},
			aptinstall: {
				command: _getAptCommand,
			},
			
			gemupdate: {
				command: 'gem update',
			},
			geminstall: {
				command: _getGemCommand,
			}
		},
	});
	
	grunt.registerTask('bitc:setup', [
		'bitc:setup:log:start',
		'bitc:setup:apt',
		'bitc:setup:gem'
		'bitc:setup:ssh',
		'bitc:setup:god',
		_conf.isServer ? 'bitc:setup:bitc:server' : 'bitc:setup:bitc:client',
	]);
	
	grunt.registerTask('bitc:setup:apt', [
		'bitc:setup:log:apt:start',
		'shell:aptupdate',
		'shell:aptupgrade',
		'sehll:aptinstall',
		'bitc:setup:log:apt:end',
	]);
	grunt.registerTask('bitc:setup:gem', [
		'bitc:setup:log:gem:start',
		'shell:gemupdate',
		'shell:geminstall',
		'bitc:setup:log:gem:end',
	]);
	
	grunt.loadTasks('../../../node_modules/grunt-shell/tasks');
	grunt.loadTasks('./tasks');
}

function _getAptCommand() {
	return (['apt-get install -y', require('./apt-dependencies').join(' ')].join(' '))
}
function _getGemCommand() {
	return (['gem install', require('./gem-dependencies').join(' ')].join(' '))
}
