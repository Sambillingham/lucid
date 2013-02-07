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

    app.configure(function() {

            app.use(express.static(__dirname + '/public'));

    });

    app.get('/', function (req, res) {

            res.sendfile(__dirname + '/index.html');

    });

    io.sockets.on('connection', function (socket) {

        socket.on('player', function (data) {

                if ( data.move === true) {

                        who.move = true;
                        who.look = false;

                        socket.emit('selectedPlayer', who );

                };

                if ( data.look === true) {

                        who.move = false;
                        who.look = true;

                        socket.emit('selectedPlayer', who );

                };

        });

        socket.on('sendMoveAccellValues', function (data) {

                accellMove = data;

                sendOSCMove();

        });


        socket.on('sendLookAccellValues', function (data) {

                accellLook = data;

                sendOSCLook();

        });

    });

    function sendOSCLook() {

            client.send('/look', accellLook.d, accellLook.x, accellLook.y );

            console.log('look', "  Z:" + accellLook.d + " X :" + accellLook.x  + " Y :" + accellLook.y);

    }

    function sendOSCMove() {

            if ( accellMove.y >  10 || accellMove.y < -10 ) {

                    accellMove.y = accellMove.y;

            } else {

                    accellMove.y = 0;

            }

            client.send('/move', accellMove.x, accellMove.y);

            console.log('Move',  " X :" + accellMove.x + " Y :" + accellMove.y );

    }
