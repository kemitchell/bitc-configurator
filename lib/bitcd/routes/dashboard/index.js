// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

module.exports = function(routes, renderPage) {
	var dashboardNavItems = require('./dashboard-nav-items');
	
	routes.callbacks.dashboard = {};
	
	routes.callbacks.index = function(req, res) {
		renderPage(req, res, 'index', {
			dashboard: {
				nav: {
					items: dashboardNavItems,
				},
				dials: [
				{
					max: 4,
					value: 2,
					label: 'Hi',
				},
				{
					max: 12,
					value: 3,
					label: 'Hi',
					sublabel: 'Hi again!',
				},
				{
					max: 3,
					value: 1,
					label: 'Howdy',
				},
				{
					max: 37,
					value: 2,
					label: 'I\'m out of greetings!',
					sublabel: 'Oh noes!',
				},
				],
			},
		});
	};
	
	routes.callbacks.dashboard.index = function(req, res) {
		
	}
	
	routes.paths['/'] = routes.callbacks.index;
	routes.paths['/dashboard'] = routes.callbacks.index;
}