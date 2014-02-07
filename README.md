BITC Configurator
=================

## WARNING: This tool is a work in progress. Please treat it as such.

**Synopsis**: `bitc [-v|--version] [-h|--help] <command> [args]`

The BITC Configurator is a command line tool used to manage a small fleet of Linux computers for [BITC][]. This tool is designed to work with an intranet in which a computer running Ubuntu Server 13.10 is the DHCP host (and functions as a modem without Internet access) and several clients running Ubuntu Desktop 13.10.

## The Environment
The computers will be completely isolated from the Internet so various restrictions on the school network cannot interfere. The scripts expect the clients to be running a fresh install of Ubuntu Desktop 13.10 and the server to be running Ubuntu Server 13.10.

**Warning**: this script *will* render all computers useless outside of the intranet. It is intended to be used on computers that are freshly formatted with Ubuntu and will be reformatted with another OS afterwards. The scripts do not affect the hardware, but the software is configured to where it would be a pain to reverse.

## The Configuration
Each client has the following options set:
- The computer name - this cannot be change after the initial setup
- The computer IP - this is dynamically set with DHCP, and does not change
- Whether the computer is an admin computer - this gives the computer login access to all other computers, and access to the web interface
- A username & password pair - the username should exist (and preferably be a sudoer and the current user) and the password will be set by the setup script. This is only used for `sudo`

## The Installation
The setup tool installs and configures the following packages with a combination of apt and other scripts:
- `nodejs`/`npm`
- `nano`
- `less`
- `git`
- `tmux`
- `openssh-client` and `openssh-server`

## Commands
- `bitc setup`: run the initial setup on the system. This is an interactive script.
	- Flags:
		- `--server`: set the machine up as the server
		- `-y|--yes`: skip all prompts and answer yes or the default. This requires `--id` and `--ip` to be present without `--server`
		- `--id <computer-id>`: automatically set the computer ID to the specified value.
		- `--ip <computer-ip>`: automatically set the computer IP to the specified value. This must be in the 10.0.0.[5-150] range.
		- `-v|--verbose`: show all command output
- `bitc login <computer-id>`: SSH into the specified computer. Note: this requires you to have the universal SSH key.
- `bitc server`: run the admin dashboard webserver on the server machine.
	- Flags:
		- `-p|--port`: specify the port to listen on
		- `--user|--username`: specify the basic auth username
		- `--pass|--password`: specify the basic auth password
	

[BITC]: http://example.com
