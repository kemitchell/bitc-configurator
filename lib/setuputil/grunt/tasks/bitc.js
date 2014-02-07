// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var colors = require('colors');

/*
* Defines the following tasks:
* - bitc:setup:bitc:{client,server}
*/

module.exports = function(grunt) {
	var _conf = grunt.file.readJSON('/etc/bitc/conf.json');
	
	grunt.registerTask('bitc:setup:client', 'set up BITC client', function() {
		grunt.log.writeln('FIXME: dummy bitc:setup:client task\n'.red).ok();
	});
	grunt.registerTask('bitc:setup:server', 'set up BITC server', function() {
		grunt.log.writeln('FIXME: dummy bitc:setup:server task\n'.red).ok();
	});
}
