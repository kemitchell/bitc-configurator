// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

$(function() {
	$(".dial").knob({
		fgColor: lessVariables['@brand-success'],
		inputColor: lessVariables['@brand-primary'], // '#333',
		// bgColor: '#eee',
		draw: function() {
			var useResponsiveColor = this.i[0].attributes['data-responsive-color'] ? this.i[0].attributes['data-responsive-color'].value : false;
			var value = (this.i[0].value / (this.o.max - this.o.min));
			
			if (!useResponsiveColor) return true;
			
			var newColor = '@brand-success';
			if (useResponsiveColor == 'inverse') {
				if (value > .5) newColor = '@brand-success';
				else if (value > .25) newColor = '@brand-warning';
				else newColor = '@brand-danger';
			} else {
				if (value < .75) newColor = '@brand-success';
				else if (value < .875) newColor = '@brand-warning';
				else newColor = '@brand-danger';
			}
			
			this.o.fgColor = lessVariables[newColor];
		},
	});
});
