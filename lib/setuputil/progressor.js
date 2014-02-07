// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var multimeter = require('multimeter');

exports.p = function(streamOrProcess) {
	var self = {
		_multi: multimeter(streamOrProcess),
		_bars: {},
		
		createBar: function(name, percent, msg) {
			return;
			if (self._bars[name]) return self.updateBar(name, percent, msg);
			self._bars[name] = self._multi.rel(0, -3);
			self.updateBar(name, percent, msg);
		},
		updateBar: function(name, percent, msg) {
			return;
			if (!self._bars[name]) return self.createBar(name, percent, msg);
			self._bars[name].percent(percent, msg);
		},
		incrementOffset: function(n) {
			self._multi.offset += n ? n : 1;
		}
	};
	return self;
}
