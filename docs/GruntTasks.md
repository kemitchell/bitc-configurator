BITC Configurator - Grunt Tasks
===============================

`bitc` uses [Grunt][] to run the setup tasks. The Gruntfile is located at `lib/setuputil/grunt/Gruntfile.js`, which contains all of the tasks necessary. The `bitc setup` command runs the `bitc:setup` task, which in turn runs all of the tasks below.

The '✘' specifies that the task is not yet implemented.

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
	- `bitc:ssh` - set up SSH and sshd
  - `bitc:tmux` - set up tmux
	- `bitc:custom` - communicate with (or set up) the BITC server
		- `bitc:setup:server` on server, or `bitc:setup:client` on client

## List of all tasks, with descriptions:
### Umbrella tasks
- `bitc:setup` - performs computer setup
- `bitc:apt` - run `shell:aptaddchromerepo`, `shell:aptupdate`, `shell:aptupgrade`, `shell:aptinstall`, and `shell:aptremove`
- `bitc:gem` - run `shell:gemupdate` and `shell:geminstall`

### Subtasks
- `shell:aptchromerepo` - adds the apt repo for Google Chrome
- `shell:aptupdate` - runs `apt-get update`
- `shell:aptupgrade` - runs `apt-get upgrade`
- `shell:aptinstall` - runs `apt-get install -y ...`
- `shell:aptremove` - runs `apt-get remove -y ...`
- `shell:gemupdate` - runs `gem update`
- `shell:geminstall` - runs `gem install ...`

[Grunt]: http://gruntjs.com
[god]: http://godrb.com
