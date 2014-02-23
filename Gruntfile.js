// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

module.exports = function(grunt) {
	var _srcFiles = [
		'./**/*.{js,jade,json,god}',
		'!./node_modules/**',
		'!./**/*bootstrap*.{js,css,json}',
		'!./**/bower_components/**',
	];
	var _lintSrcFiles = [
		'./**/*.js',
		'!./node_modules/**',
		'!./**/*bootstrap*.{js,css,json}',
		'!./**/bower_components/**',
	];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		trimtrailingspaces: {
			main: {
				src: _srcFiles,
				options: {
					filter: 'isFile',
					encoding: 'utf8',
					failIfTrimmed: false,
				},
			},
		},

		eslint: {
			options: {
				config: '.eslintrc',
			},
			target: _lintSrcFiles,
		},
	});

	grunt.loadNpmTasks('grunt-trimtrailingspaces');
	grunt.loadNpmTasks('grunt-eslint');

	grunt.registerTask('default', ['trimtrailingspaces']);
};
