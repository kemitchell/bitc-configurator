// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var colors = require('colors');

module.exports = function(grunt) {
	var _conf = grunt.file.readJSON('/etc/bitc/conf.json');
	
	grunt.initConfig({
		conf: _conf,
		_fileContentsProcessor: _fileContentsProcessorImpl,
		
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
		'log:start',
		'bitc:apt', // -> log:apt:start -> shell:apt{update,upgrade,install} -> log:apt:end
		'bitc:gem', // -> log:gem:start -> shell:gem{update,install} -> log:gem:end
		'bitc:switchnetwork',
		'bitc:god', // -> log:god:start -> bitc:god -> log:god:end
		'bitc:ssh', // -> log:ssh:start -> bitc:ssh -> log:ssh:end
		'bitc:custom', // -> log:bitc:start -> bitc:server/bitc:client -> log:bitc:end
		'log:end',
	]);
	
	grunt.registerTask('bitc:apt', [
		'log:apt:start',
		'shell:aptupdate',
		'shell:aptupgrade',
		'shell:aptinstall',
		'log:apt:end',
	]);
	grunt.registerTask('bitc:gem', [
		'log:gem:start',
		'shell:gemupdate',
		'shell:geminstall',
		'log:gem:end',
	]);
	grunt.registerTask('bitc:god', [
		'log:god:start',
		'bitc:setup:god', // god.js
		'log:god:end',
	]);
	grunt.registerTask('bitc:ssh', [
		'log:ssh:start',
		'bitc:setup:ssh', // ssh.js
		'log:ssh:end',
	]);
	grunt.registerTask('bitc:custom', [
		'log:bitc:start',
		_conf.isServer ? 'bitc:setup:server' : 'bitc:setup:client', // bitc.js
		'log:bitc:end',
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

function _fileContentsProcessorImpl(contents, path) {
	return grunt.template.process(contents);
}
