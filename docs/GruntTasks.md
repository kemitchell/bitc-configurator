BITC Configurator - Grunt Tasks
===============================

`bitc` uses [Grunt][] to run the setup tasks. The Gruntfile is located at `lib/setuputil/grunt/Gruntfile.js`, which contains all of the tasks necessary. The `bitc setup` command runs the `bitc:setup` task, which in turn runs all of the tasks below.

- `bitc:setup` - umbrella task for `bitc setup`
	- `bitc:apt` - update/upgrade/install packages with apt
		- `shell:aptaddchromerepo` - add repository for Google Chrome
		- `shell:aptupdate` - `sudo apt-get update`
		- `shell:aptupgrade` - `sudo apt-get upgrade`
		- `shell:aptinstall` - `sudo apt-get install -y <packages>`
		- `shell:aptremove` - `sudo apt-get remove -y <packages>`
	- `bitc:gem` - update/install packages with gem
		- `shell:gemupdate` - `sudo gem update`
		- `shell:geminstall` - `sudo gem install <packages>`
	- `bitc:fixnode` - fix the Node install and update it and npm to the latest versions
		- `bitc:fixnode:removeaptnpm` - `sudo apt-get remove -y npm` (alias to `shell:aptremovenpm`)
		- `bitc:fixnode:installnpm` - `sudo npm install --global npm n` (using a package.json dependency version which apt won't remove)
		- `bitc:fixnode:installnode` - `sudo n latest`
		- `bitc:fixnode:removeaptnode` - `sudo apt-get remove -y nodejs` (alias to `shell:aptremovenode`)
	- `bitc:switchnetwork` - prompt user to switch to the BITC intranet, then set up new network
	- `bitc:god` - set up [god][]
		- `bitc:setup:god` - perform setup
	- `bitc:ssh` - set up SSH and sshd
		- `bitc:setup:ssh` - perform setup
	- `bitc:custom` - communicate with (or set up) the BITC server
		- `bitc:setup:shared` - set up things like tmux which are present on both client and server
		- `bitc:setup:server` on server, or `bitc:setup:client` on client - register computer, setup daemon, ...

[Grunt]: http://gruntjs.com
[god]: http://godrb.com
