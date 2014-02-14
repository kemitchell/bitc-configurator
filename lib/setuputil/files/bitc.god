# bitc-configurator: management of a small set of Linux computers
# Copyright(c) 2014 Joshua Oldenburg (http://joshuaoldenburg.com)
# Released under the GPLv3 license. See LICENSE.txt for more info

God.watch do |w|
	w.name = 'bitcd'
	w.start = 'bitc-server'
	w.keepalive(:memory_max => 150.megabytes, :cpu_max => 50.percent)
	
	w.uid = 'root'
	w.dir = '/etc/bitc'
	
	w.env = {
		'NODE_ENV' => 'production',
	}
end
