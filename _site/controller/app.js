    var express = require('express'),
        app = express(),
        server = require('http').createServer(app),
        io = require('socket.io').listen(server, { log: false }),
        osc = require('node-osc');

    var who = { move: false, look: false },
        accellMove = { x: 0, y: 0, d: 0 };
        accellLook = { x: 0, y: 0, d: 0 };

    var client = new osc.Client('192.168.0.5', 3333);

    server.listen(8080);
