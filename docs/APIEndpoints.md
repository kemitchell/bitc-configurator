BITC Configurator - API Endpoints
=================================

- `/api/1/dashboard/status`: `GET` the status of all computers on the network.

- `/api/1/registerComputer`: When a computer is first set up with `bitc setup`, one of the last tasks in the process is to send its settings to the server. The computer `POST`s the server at this endpoint with its conf.json in the payload. The server then registers the computer, and saves its data in a JSON file named for its IP in `/etc/bitc/clients/`.
- `/api/1/getAuthorizedKeys`: `GET` the keys usable for SSH logins.
- `/api/1/getGlobalKey`: `GET` the global private key. This is only accessible by computers with IP's registered as admins.
- `/api/1/getGlobalKey.pub`: `GET` the global public key.
