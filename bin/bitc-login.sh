#!/bin/bash
# bitc-configurator: management of a small set of Linux computers
# Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
# Released under the GPLv3 license. See LICENSE.txt for more info

if [[ "$#" -ne 1 ]]; then
	echo "Usage: $0 <id>"
	exit 1
fi

SSHCMD=$(bitc _private id2ssh $1) # $(echo "ssh josh@127.0.0.1")
LOOKUPEXIT=$?

if [[ "$LOOKUPEXIT" -ne 0 ]]; then
	echo $SSHCMD
	exit 1
fi

$SSHCMD
