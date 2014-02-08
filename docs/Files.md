BITC Configurator - Files
=========================

BITC Configurator stores all of its configuration in `/etc/bitc` in various json files. All computers have a `conf.json` file, which stores the values given at the prompts during setup. The client's data is kept locally, but the official values are stored on the server to stop troublemakers from editing them.

## Communication
When a computer is first set up with `bitc setup`, one of the last tasks in the process is to send its settings to the server. The computer `POST`s the server at `http://10.0.0.1/api/1/registerComputer` with its conf.json in the payload. The server then registers the computer, and saves its data in a JSON file named for its IP in `/etc/bitc/clients/`.

## Examples
### `conf.json`:

	{
	    "computerID": "{computer-ID}",
	    "computerIP": "{computer-IP}",
	    "isServer": false,
	    "username": "bitc",
	    "password": "password",
	    "isAdmin": false
	}

### `10.0.0.x.json`:
	
	{
	    "computerID": "{computer-ID}",
	    "computerIP": "{computer-IP}",
	    "isServer": false,
	    "username": "bitc",
	    "password": "password",
	    "isAdmin": false
	}