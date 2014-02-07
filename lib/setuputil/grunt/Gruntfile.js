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
		'bitc:setup:apt', // -> log:apt:start -> shell:apt{update,upgrade,install} -> log:apt:end
		'bitc:setup:gem', // -> log:gem:start -> shell:gem{update,install} -> log:gem:end
		'bitc:setup:god', // -> log:god:start -> bitc:god -> log:god:end
		'bitc:setup:ssh', // -> log:ssh:start -> bitc:ssh -> log:ssh:end
		'bitc:setup:bitc', // -> log:bitc:start -> bitc:server/bitc:client -> log:bitc:end
	]);
	
	grunt.registerTask('bitc:setup:apt', [
		'bitc:setup:log:apt:start',
		'shell:aptupdate',
		'shell:aptupgrade',
		'shell:aptinstall',
		'bitc:setup:log:apt:end',
	]);
	grunt.registerTask('bitc:setup:gem', [
		'bitc:setup:log:gem:start',
		'shell:gemupdate',
		'shell:geminstall',
		'bitc:setup:log:gem:end',
	]);
	grunt.registerTask('bitc:setup:god', [
		'bitc:setup:log:god:start',
		'bitc:setup:bitc:god', // god.js
		'bitc:setup:log:god:end',
	]);
	grunt.registerTask('bitc:setup:ssh', [
		'bitc:setup:log:ssh:start',
		'bitc:setup:bitc:ssh', // ssh.js
		'bitc:setup:log:ssh:end',
	]);
	grunt.registerTask('bitc:setup:bitc', [
		'bitc:setup:log:bitc:start',
		_conf.isServer ? 'bitc:setup:bitc:server' : 'bitc:setup:bitc:client', // bitc.js
		'bitc:setup:log:bitc:end',
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
