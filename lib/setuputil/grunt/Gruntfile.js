// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var colors = require('colors');
var api = require('../../api');

var gruntGlobal;

module.exports = function(grunt) {
	var _conf = api.thisComputer;
	gruntGlobal = grunt;

	grunt.initConfig({
		conf: _conf,

		shell: {
			options: {
				// stdout: _conf.verbose,
				// stderr: _conf.verbose,
				stdin: false,
				failOnError: true,
			},

			aptaddchromerepo: {
				command: '(wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -) && (echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list)'
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
			aptremove: {
				command: 'apt-get remove -y network-manager',
			}

			gemupdate: {
				command: 'gem update',
			},
			geminstall: {
				command: _getGemCommand,
			}
		},
	});

	grunt.registerTask('bitc:setup', [
		'bitc:apt', // -> shell:apt{update,upgrade,install}
		'bitc:gem', // -> shell:gem{update,install}
		'bitc:switchnetwork',
		'bitc:god',
		'bitc:ssh',
		'bitc:custom', // -> bitc:server / bitc:client
	]);

	grunt.registerTask('bitc:apt', [
		'shell:aptaddchromerepo',
		'shell:aptupdate',
		'shell:aptupgrade',
		'shell:aptinstall',
		'shell:aptremove',
	]);
	grunt.registerTask('bitc:gem', [
		'shell:gemupdate',
		'shell:geminstall',
	]);
	grunt.registerTask('bitc:god', [
		'bitc:setup:god', // god.js
	]);
	grunt.registerTask('bitc:ssh', [
		'bitc:setup:ssh', // ssh.js
	]);
	grunt.registerTask('bitc:custom', [
		_conf.isServer ? 'bitc:setup:server' : 'bitc:setup:client', // bitc.js
	]);

	grunt.loadTasks('../../../node_modules/grunt-shell/tasks');
	grunt.loadTasks('./tasks');
}

module.exports.fileContentsProcessor = _fileContentsProcessorImpl;

function _getAptCommand() {
	return (['apt-get install -y', require('./apt-dependencies').join(' '), require('./apt-dependencies' + (api.thisComputer.isServer ? '-server' : '-client')).join(' ')].join(' '))
}
function _getGemCommand() {
	return (['gem install', require('./gem-dependencies').join(' ')].join(' '))
}

function _fileContentsProcessorImpl(contents, path) {
	return gruntGlobal.template.process(contents);
}
