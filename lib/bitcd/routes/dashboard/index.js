// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

var _ = require('underscore');
var api = require('../../../api');

module.exports = function(routes, renderPage) {
	var dashboardNavItems = require('./dashboard-nav-items');

	routes.callbacks.dashboard = {};

	routes.callbacks.index = function(req, res, next) {
		var allComputers = [];
		api.ComputerConfig.getAllIPs(function(err, ips) {
			if (err) return next(err);

			allComputers = _.map(ips, function(ip) {
				return api.ComputerConfig(ip);
			});

			renderPage(req, res, 'index', {
				dashboard: {
					nav: {
						items: dashboardNavItems,
					},
					dials: [
						{
							max: 6,
							value: 4,
							label: 'Online Computers',
							sublabel: 'Turned on and responsive',
							responsiveColor: 'inverse',
						},
						{
							max: 6,
							value: 2,
							label: 'Logins',
							sublabel: '',
							responsiveColor: false,
						},
						{
							max: 2,
							value: 1,
							label: 'Admin Logins',
							responsiveColor: false,
						},
						{
							max: 150,
							value: 6,
							label: 'Registered Computers',
							sublabel: 'Where <code>bitc setup</code> has been run',
							responsiveColor: true,
						},
					],
					computers: allComputers,
				},
			});
		});
	};

	routes.callbacks.dashboard.index = function(req, res) {
		res.redirect('/');
	}

	routes.paths['/'] = routes.callbacks.index;
	routes.paths['/dashboard'] = routes.callbacks.dashboard.index;
}