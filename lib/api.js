// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

// api.version
var pkginfo = require('pkginfo')(module, 'version');

// api.ComputerConfig([computerIP])
exports.ComputerConfig = require('./computerconfig');
exports.thisComputer = exports.ComputerConfig();

// api.runGruntTask(task[, verbose])
exports.runGruntTask = require('./setuputil/tasks').runGruntTask;
