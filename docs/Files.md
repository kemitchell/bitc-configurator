BITC Configurator - Files
=========================

BITC Configurator stores all of its configuration in `/etc/bitc` in various json files. All computers have a `conf.json` file, which stores the values given at the prompts during setup. The client's data is kept locally, but the official values are stored on the server to stop troublemakers from editing them.

## Examples
### `/etc/bitc/conf.json`:
(On all computers)

	{
	    "computerID": "{computer-ID}",
	    "computerIP": "{computer-IP}",
	    "isServer": false,
	    "username": "bitc",
	    "password": "password",
	    "isAdmin": false
	}

### `/etc/bitc/10.0.0.x.json`:
(Only on server)
	
	{
	    "computerID": "{computer-ID}",
	    "computerIP": "{computer-IP}",
	    "isServer": false,
	    "username": "bitc",
	    "password": "password",
	    "isAdmin": false
	}

### `/etc/bitc/ssh/globalKey`/`/etc/bitc/ssh/globalKey.pub`
These files store the private and public SSH keys. (See README.md)

### `/etc/bitc/ssh/authorized_keys`
This file stores the usable public keys.