// bitc-configurator: management of a small set of Linux computers
// Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
// Released under the GPLv3 license. See LICENSE.txt for more info

exports.getDefaults = function(isServer) {
	var retVal = {};
	var items = exports.prompts(isServer);
	for (var itemIndex in items) retVal[items[itemIndex].name] = items[itemIndex].default;
	return retVal;
}

exports.ipValidator = /^(10\.0\.0\.([5-9]|[1-9][0-9]|1[1-4][0-9]|150))$/;

exports.prompts = function(isServer) {
	var prompts = [{
		name: 'computerid',
		description: 'What should the computer ID be?',
		type: 'string',
		pattern: /^[-a-zA-Z0-9]+$/,
		default: isServer ? 'BITC-SERVER' : undefined,
		required: true,
	}];

	if (!isServer) prompts.push(
		{
			name: 'computerip',
			description: 'What should the computer\'s IP be (10.0.0.[5-150])?',
			type: 'string',
			pattern: exports.ipValidator,
			message: 'The IP address must be in the 10.0.0.[5-150] range.',
			required: true,
		},
		{
			name: 'computerisadmin',
			description: 'Is this computer for a BITC teacher or administrator [Y/n]?',
			type: 'string',
			default: 'n',
			required: false,
		}
	);

	prompts.push(
		{
			name: 'username',
			description: 'What is the normal login username?',
			type: 'string',
			pattern: /^([a-z_][a-z0-9_]{0,30})$/,
			message: 'That is an invalid username.',
			default: 'bitc',
			required: true,
		},
		{
			name: 'password',
			description: 'What should the normal login password be set to?',
			type: 'string',
			hidden: false,
			default: 'password',
			required: true,
		},
		{
			name: 'passwordconfirm',
			description: 'Confirm the password or leave blank to skip',
			type: 'string',
			hidden: true,
			message: 'The passwords did not match. Please restart the process (^C) and try again.',
			default: 'ThisWillBeReplacedAutomagicallyWithTheOriginalValueSoPeopleCanSkipTheConfirmationIfTheyAreLazy',
			conform: function(value) {
				return value == 'ThisWillBeReplacedAutomagicallyWithTheOriginalValueSoPeopleCanSkipTheConfirmationIfTheyAreLazy' || value == prompt.history('password').value;
			},
			required: true,
		}
	);

	return prompts;
}
