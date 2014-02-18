// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var colors = require('colors');
var exec = require('child_process').exec;

/*
* Defines the following tasks:
* - bitc:setup:god
*/

module.exports = function(grunt) {
	var _conf = grunt.file.readJSON('/etc/bitc/conf.json');
	
	grunt.registerTask('bitc:setup:god', 'logging', function() {
		if (!_conf.isServer) return;
		
		grunt.file.copy('../files/*.god', '/etc/bitc/god/');
		
		var godCommand = '/usr/bin/god -c /etc/bitc/god/bitc.god'
		var done = this.async();
		exec('(sudo crontab -l ; echo "@reboot ' + godCommand + '") | uniq - | sudo crontab -', {
			timeout: 30000,
		}, function(error, stdout, stderr) {
			if (error) {
				grunt.fail.warn(error);
				done(false);
				return;
			}
			
			exec(godCommand, {
				timeout: 30000,
			}, function(error, stdout, stderr) {
				if (error) {
					grunt.fail.warn(error);
					done(false);
					return;
				}
				
				grunt.log.writeln('God successfully configured and started').ok();
				done();
			});
		});
	});
}
