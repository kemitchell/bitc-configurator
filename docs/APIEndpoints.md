BITC Configurator - API Endpoints
=================================

- `/api/1/registerComputer`: When a computer is first set up with `bitc setup`, one of the last tasks in the process is to send its settings to the server. The computer `POST`s the server at this endpoint with its conf.json in the payload. The server then registers the computer, and saves its data in a JSON file named for its IP in `/etc/bitc/clients/`.
- `/api/1/`