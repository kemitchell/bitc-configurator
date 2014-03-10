// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var colors = require('colors');
var exec = require('child_process').exec;
var api = require('../../../api');
var path = require('path');
var async = require('async');
var _ = require('underscore');
var gruntfile = require('../Gruntfile');

var dconfVars = require('../dconf.json');
var lightdmVars = require('../lightdm.json');

/*
* Defines the following tasks:
* - bitc:dconf
*/

module.exports = function(grunt) {
	var _conf = api.thisComputer;

	grunt.registerTask('bitc:dconf', 'set up dconf (misc. configs)', function() {
		if (_conf.isServer) return;
		var done = this.async();

		async.eachLimit(_.keys(dconfVars), 3, _setDconfItem, function(err) {
			if (err) grunt.log.writeln('Warning: bitc:dconf encountered an error: '.yellow, err);
			done(err);
		});
	});

	grunt.registerTask('bitc:lightdm', 'configure lightdm', function() {
		if (_conf.isServer) return;
		var done = this.async();

		async.eachSeries(_.keys(lightdmVars), _setLightdmItem, function(err) {
			if (err) grunt.log.writeln('Warning: bitc:lightdm encountered an error: '.yellow, err);
			done(err);
		});
	});
}

function _setDconfItem(item, callback) {
	exec(('dconf write ' + item + ' "' + dconfVars[item] + '"'), { // No escaping, but shouldn't be terribly dangerous
		timeout: 30000,
	}, function(error, stdout, stderr) {
		callback(error);
	});
}

function _setLightdmItem(item, callback) {
	exec(('/usr/lib/lightdm/lightdm-set-defaults ' + item + ' ' + gruntfile.fileContentsProcessor(lightdmVars[item])), { // fileContentsProcessor just templates the string
		timeout: 30000,
	}, function(error, stdout, stderr) {
		callback(error);
	});
}
