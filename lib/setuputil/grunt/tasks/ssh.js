// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var colors = require('colors');

/*
* Defines the following tasks:
* - bitc:setup:bitc:ssh
* - bitc:setup:bitc:ssh:client
* - bitc:setup:bitc:ssh:server
*/

module.exports = function(grunt) {
	var _conf = grunt.file.readJSON('/etc/bitc/conf.json');
	
	grunt.registerTask('bitc:setup:ssh', [
		_conf.isServer ? 'bitc:setup:ssh:server' : 'bitc:setup:ssh:client',
	]);
	
	grunt.registerTask('bitc:setup:ssh:server', 'set up SSH - server', function() {
		grunt.log.writeln('FIXME: dummy bitc:setup:ssh task\n'.red).ok();
	});
	
	grunt.registerTask('bitc:setup:ssh:client', 'set up SSH - client', function() {
		grunt.log.writeln('FIXME: dummy bitc:setup:ssh task\n'.red).ok();
	});
}
