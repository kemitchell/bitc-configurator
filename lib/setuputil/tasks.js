// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var grunt = require('grunt');
var path = require('path');
var api = require('../api');

exports.performSetUp = function(options) {
	if (!grunt.file.isDir('/etc/bitc')) grunt.file.mkdir('/etc/bitc');
	// grunt.file.write('/etc/bitc/conf.json', JSON.stringify(options, null, 4));

	if (!options.intranetOnly) api.thisComputer.setToObject(options).saveChanges(_cb);
	else _cb();

	function _cb(err) {
		if (err) {
			throw err;
			process.exit(1);
		}

		// This is where the magic happens
		exports.runGruntTask((options.intranetOnly ? 'bitc:setup:intranet' : 'bitc:setup'), options.verbose);
	}
}

exports.runGruntTask = function(task, verboseOutput) {
	grunt.file.setBase(__dirname);

	grunt.tasks(task, {
		gruntfile: path.join(__dirname, 'grunt', 'Gruntfile.js'),
		base: path.join(__dirname, 'grunt'),
		verbose: verboseOutput,
	});
}
