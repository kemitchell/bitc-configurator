// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var colors = require('colors');
var request = require('request');

/*
* Defines the following tasks:
* - bitc:setup:bitc:{client,server}
*/

module.exports = function(grunt) {
	var _conf = grunt.file.readJSON('/etc/bitc/conf.json');
	
	grunt.registerTask('bitc:setup:client', 'set up BITC client', function() {
		grunt.log.writeln('FIXME: dummy bitc:setup:client task\n'.red).ok();
		
		var done = this.async();
		request.post('http://10.0.0.1/api/1/registerComputer', {
			form: _conf,
			json: true,
		}, function(error, response, body) {
			if (error) {
				grunt.fail.fatal(error);
				done();
				return;
			}
			if (response.statusCode != 201) {
				grunt.fail.fatal('/api/1/registerComputer returned status code ' + response.statusCode + ', should be 201 Created.');
				done();
				return;
			}
			if (body.error) {
				grunt.fail.fatal('/api/1/registerComputer returned error "' + body.error + '", but status code 201.');
				done();
				return;
			}
			
			done();
		});
	});
	grunt.registerTask('bitc:setup:server', 'set up BITC server', function() {
		grunt.log.writeln('FIXME: dummy bitc:setup:server task\n'.red).ok();
	});
}
