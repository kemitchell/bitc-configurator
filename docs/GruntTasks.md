BITC Configurator - Grunt Tasks
===============================

`bitc` uses [Grunt][] to run the setup tasks. The Gruntfile is located at `lib/setuputil/grunt/Gruntfile.js`, which contains all of the tasks necessary. The `bitc setup` command runs the `bitc:setup` task, which in turn runs all of the tasks below.

The '✘' specifies that the task is not yet implemented.

New:
- `bitc:setup` - umbrella task for `bitc setup`
	- `bitc:apt` - update/upgrade/install packages with apt
		- `shell:aptupdate`
		- `shell:aptupgrade`
		- `shell:aptinstall`
	- `bitc:gem` - update/install packages with gem
		- `shell:gemupdate`
		- `shell:geminstall`
	- `bitc:switchnetwork` - prompt user to switch to the BITC intranet
	- `bitc:god` - set up [god][]
		- `bitc:setup:god`
	- `bitc:ssh` - set up SSH and sshd
		- `bitc:setup:ssh`
	- `bitc:custom` - communicate with (or set up) the BITC server
		- `bitc:setup:server` on server, or `bitc:setup:client` on client

[Grunt]: http://gruntjs.com
[god]: http://godrb.com
