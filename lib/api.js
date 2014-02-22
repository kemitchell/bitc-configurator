// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var pkginfo = require('pkginfo')(module, 'version');

exports.ComputerConfig = require('./computerconfig');
exports.thisComputer = exports.ComputerConfig();
