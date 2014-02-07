// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var colors = require('colors');

/*
* Defines the following tasks:
* - bitc:setup:log:start
* - bitc:setup:log:apt:{start,end}
* - bitc:setup:log:ssh:{start,end}
*/

module.exports = function(grunt) {
	var _conf = grunt.file.readJSON('/etc/bitc/conf.json');
	
	grunt.registerTask('bitc:setup:log:start', 'logging', function() {
		grunt.log.writeln('Grunt loaded\n'.grey).ok();
	});
	
	grunt.registerTask('bitc:setup:log:apt:start', 'logging', function() {
		grunt.log.writeln('Updating and installing apt packages...'.grey);
	});
	grunt.registerTask('bitc:setup:log:apt:end', 'logging', function() {
		grunt.log.writeln('Finished updating and installing apt packages.'.green).ok();
	});
	
	grunt.registerTask('bitc:setup:log:gem:start', 'logging', function() {
		grunt.log.writeln('Updating and installing rubygem packages...'.grey);
	});
	grunt.registerTask('bitc:setup:log:gem:end', 'logging', function() {
		grunt.log.writeln('Finished updating and installing rubygem packages.'.green).ok();
	});
	
	grunt.registerTask('bitc:setup:log:ssh:start', 'logging', function() {
		grunt.log.writeln('Updating SSH settings...'.grey);
	});
	grunt.registerTask('bitc:setup:log:ssh:end', 'logging', function() {
		grunt.log.writeln('Finished updating SSH settings.'.green).ok();
	});
	
	
}
