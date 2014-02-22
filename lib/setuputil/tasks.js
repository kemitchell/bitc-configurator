// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var grunt = require('grunt');
var path = require('path');
var api = require('../api');

exports.performSetUp = function(options) {
	if (!grunt.file.isDir('/etc/bitc')) grunt.file.mkdir('/etc/bitc');
	// grunt.file.write('/etc/bitc/conf.json', JSON.stringify(options, null, 4));
	
	api.thisComputer.setToObject(options).saveChanges(function(err) {
		if (err) {
			throw err;
			process.exit(1);
		}
		
		grunt.file.setBase(__dirname);
	
		// This is where the magic happens
		grunt.tasks('bitc:setup', {
			gruntfile: path.join(__dirname, 'grunt', 'Gruntfile.js'),
			base: path.join(__dirname, 'grunt'),
		});
	});
}
