BITC Configurator - Files
=========================

BITC Configurator stores all of its configuration in `/etc/bitc` in various json files. All computers have a `conf.json` file, which stores the values given at the prompts during setup. The client's data is kept locally, but the official values are stored on the server to stop troublemakers from editing them.

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

### `globalKey`/`globalKey.pub`
These files store the private and public SSH keys. (See README.md)