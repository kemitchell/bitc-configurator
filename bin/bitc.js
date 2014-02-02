#!/usr/bin/env node
// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var api = require('../lib/api');
var argv = require('commander')
	.version(api.version)
	.command('setup', 'Set up this computer for BITC')
	.parse(process.argv);
