BITC Configurator
=================

**Synopsis**: `bitc [-v|--version] [-h|--help] <command> [args]`

The BITC Configurator is a command line tool used to manage a small fleet of Linux computers for [BITC][]. This tool is designed to work with an intranet in which a computer running Ubuntu Server 13.10 is the DHCP host (and functions as a modem without Internet access) and several clients running Ubuntu Desktop 13.10.

## The Environment
The computers will be completely isolated from the Internet so various restrictions on the school network cannot interfere. The scripts expect the clients to be running a fresh install of Ubuntu Desktop 13.10 and the server to be running Ubuntu Server 13.10.

**Warning**: this script *will* render all computers useless outside of the intranet. It is intended to be used on computers that are freshly formatted with Ubuntu and will be reformatted with another OS afterwards. The scripts do not affect the hardware, but the software is configured to where it would be a pain to reverse.

## Commands
- `bitc setup`: run the initial setup on the system. This is an interactive script.
	- Flags:
		- `--server`: set the machine up as the server
- `bitc login <computer-id>`: SSH into the specified computer. Note: this requires you to have the universal SSH key.
- `bitcd`: run the webserver on the server machine.
	- Flags:
		- `-p|--port`: specify the port to listen on
		- `--user|--username`: specify the basic auth username
		- `--pass|--password`: specify the basic auth password
	

[BITC]: http://fixme.com