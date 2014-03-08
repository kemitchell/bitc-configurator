#!/usr/bin/env node
// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var api = require('../lib/api');
var cmd = require('commander').version(api.version);

cmd.command('tmux-status-right', 'Get the text that shows up on the right side of tmux status bar');

var argv = cmd.parse(process.argv);
