BITC Configurator - Grunt Tasks
===============================

`bitc` uses [Grunt][] to run the setup tasks. The Gruntfile is located at `lib/setuputil/grunt/Gruntfile.js`, which contains all of the tasks necessary. The `bitc setup` command runs the `bitc:setup` task, which in turn runs all of the tasks below.

*Note*: this list may not be entirely accurate. Please see `Gruntfile.js`, located in `lib/setuputil/grunt/`, to see all of the tasks.

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
	- `bitc:switchnetwork:prompt` - prompt user to switch to the BITC intranet
	- `bitc:switchnetwork:intranet` - set up network for intranet
	- `bitc:custom` - communicate with (or set up) the BITC server
		- `bitc:setup:shared` - set up things like tmux which are present on both client and server
		- `bitc:setup:server` on server, or `bitc:setup:client` on client - register computer, setup daemon, ...
	- `bitc:god` - set up [god][]
	- `bitc:ssh` - set up SSH and sshd
	- `bitc:tmux` - set up tmux
	- `bitc:lightdm` - set up lightdm
	- `bitc:mutevolume` - mute speakers

## List of all tasks, with descriptions:
### Umbrella tasks
- `bitc:setup` - performs computer setup
- `bitc:setup:internet` - runs the setup tasks dependent on the Internet (`bitc:apt`, `bitc:gem`, and `bitc:fixnode`)
- `bitc:setup:intranet` - runs the setup tasks that don't require the Internet (pretty much everything else)
- `bitc:apt` - runs `shell:aptaddchromerepo`, `shell:aptupdate`, `shell:aptupgrade`, `shell:aptinstall`, and `shell:aptremove`
- `bitc:gem` - runs `shell:gemupdate` and `shell:geminstall`
- `bitc:fixnode` - runs `bitc:fixnode:removeaptnpm`, `bitc:fixnode:installnpm`, and `bitc:fixnode:installnode`
- `bitc:custom` - runs `bitc:setup:shared` and either `bitc:setup:client` or `bitc:setup:server`

### Individual tasks
- `bitc:switchnetworkprompt` - ask the user to change the network connection
- `bitc:switchnetwork:intranet` - switch the network config to the private network
- `bitc:switchnetwork:internet` - switch the network config to the Internet
- `shell:aptchromerepo` - adds the apt repo for Google Chrome
- `shell:aptupdate` - runs `apt-get update`
- `shell:aptupgrade` - runs `apt-get upgrade`
- `shell:aptinstall` - runs `apt-get install -y ...`
- `shell:aptremove` - runs `apt-get remove -y ...`
- `shell:gemupdate` - runs `gem update`
- `shell:geminstall` - runs `gem install ...`
- `bitc:dconf` - configure dconf settings for the login user (things like the launcher favorites and disabling locking the screen)
- `bitc:god` - set up [god][] (the daemon runner)
- `bitc:ssh` - set up SSH and the SSH daemon
- `bitc:lightdm` - set up lightdm (the login manager) for things like disabling the guest user and setting up autologin
- `bitc:mutevolume` - mutes speakers by running `amixer -D pulse sset Master mute`
- `bitc:setup:server` - sets up the server
- `bitc:setup:client` - registers the client with the server
- `bitc:setup:shared` - currently a no-op

[Grunt]: http://gruntjs.com
[god]: http://godrb.com
