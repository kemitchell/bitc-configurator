BITC Configurator - Grunt Tasks
===============================

`bitc` uses [Grunt][] to run the setup tasks. The Gruntfile is located at `lib/setuputil/grunt/Gruntfile.js`, which contains all of the tasks necessary. The `bitc setup` command runs the `bitc:setup` task, which in turn runs all of the tasks below.

The '✘' specifies that the task is not yet implemented.

Current:
- `bitc:setup`
	- `log:start`
	- `bitc:apt`
		- `log:apt:start`
		- `shell:aptupdate`
		- `shell:aptupgrade`
		- `shell:aptinstall`
		- `log:apt:end`
	- `bitc:gem`
		- `log:gem:start`
		- `shell:gemupdate`
		- `shell:geminstall`
		- `log:gem:end`
	- `bitc:god`
		- `log:god:start`
		- `bitc:setup:god` - ✘
		- `log:god:end`
	- `bitc:ssh`
		- `log:ssh:start`
		- `bitc:setup:ssh` - ✘
		- `log:ssh:end`
	- `bitc:custom`
		- `log:bitc:start`
		- `bitc:setup:server` on server, or `bitc:setup:client` on client - ✘
		- `log:bitc:end`
	- `log:end`

New:
- `bitc:setup` - umbrella task for `bitc setup`
	- `log:start`
	- `bitc:apt` - update/upgrade/install packages with apt
		- `log:apt:start`
		- `shell:aptupdate`
		- `shell:aptupgrade`
		- `shell:aptinstall`
		- `log:apt:end`
	- `bitc:gem` - update/install packages with gem
		- `log:gem:start`
		- `shell:gemupdate`
		- `shell:geminstall`
		- `log:gem:end`
	- `bitc:switchnetwork` - prompt user to switch to the BITC intranet
	- `bitc:god` - set up [god][]
		- `log:god:start`
		- `bitc:setup:god` - ✘
		- `log:god:end`
	- `bitc:ssh` - set up SSH and sshd
		- `log:ssh:start`
		- `bitc:setup:ssh` - ✘
		- `log:ssh:end`
	- `bitc:custom` - communicate with (or set up) the BITC server
		- `log:bitc:start`
		- `bitc:setup:server` on server, or `bitc:setup:client` on client - ✘
		- `log:bitc:end`

[Grunt]: http://gruntjs.com
[god]: http://godrb.com
