// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		trimtrailingspaces: {
			main: {
				src: ['./**/*.{js,jade,json,god}'],
				options: {
					filter: 'isFile',
					encoding: 'utf8',
					failIfTrimmed: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-trimtrailingspaces');

	grunt.registerTask('default', ['trimtrailingspaces']);

};