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
					max: 2,
					value: 2,
					label: 'Online Computers',
					sublabel: 'Turned on and responsive',
					responsiveColor: 'inverse',
				},
				{
					max: 2,
					value: 1,
					label: 'Logins',
					sublabel: '',
					responsiveColor: false,
				},
				{
					max: 2,
					value: 0,
					label: 'Admin Logins',
					responsiveColor: false,
				},
				{
					max: 150,
					value: 2,
					label: 'Registered Computers',
					sublabel: 'Where <code>bitc setup</code> has been run',
					responsiveColor: true,
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