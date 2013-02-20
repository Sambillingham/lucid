    var express = require('express'),
        app = express(),
        server = require('http').createServer(app),
        io = require('socket.io').listen(server, { log: false }),
        osc = require('node-osc');

    var who = { move: false, look: false },
        accellMove = { x: 0, y: 0, d: 0 };
        accellLook = { x: 0, y: 0, d: 0 };

    var client = new osc.Client('192.168.43.144', 3333);

    server.listen(8080);

    app.configure(function() {

            app.use(express.static(__dirname + '/public'));

    });


    app.get('/look', function (req, res) {

            res.sendfile(__dirname + '/look.html');

    });

    app.get('/move', function (req, res) {

            res.sendfile(__dirname + '/move.html');

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

            var thisLookD = ( accellLook.d/4 ),
                thisLookX = accellLook.x,
                thisLookY = accellLook.y;


            if ( thisLookD > 0 && thisLookD < 45 ){

                thisLookD = 0 -(thisLookD);

            } else if ( thisLookD >= 45 && thisLookD <=90){

                thisLookD = 90 - thisLookD;
            }

            thisLookD = ((thisLookD/45)*2);

            if ( thisLookD >= 1) {

                thisLookD = 1;

            } else if ( thisLookD <= -1) {

                    thisLookD = -1;

            }

            if ( thisLookX > 45 ){

                thisLookX = 45;

            } else if ( thisLookX < - 45 ) {

                thisLookX = -45;
            }

            if ( thisLookY > 45 ){

                thisLookY = 45;

            } else if ( thisLookY < - 45 ) {

                thisLookY = -45;
            }



            client.send('/look', thisLookD, thisLookX, thisLookY );

            console.log('look', "  Z:" + thisLookD + " X :" + thisLookX  + " Y :" + thisLookY);


    }

    function sendOSCMove() {

            if ( accellMove.x >  10 || accellMove.x < -10 ) {

                    accellMove.x = accellMove.x;

            } else {

            }


            if ( accellMove.y <  -10  ) {

                    accellMove.y = -1;

            } else if ( accellMove.y >  10  ) {

                    accellMove.y = 1;

            } else {

                accellMove.y = 0;
            }





            client.send('/move', accellMove.y , accellMove.x );

            console.log('Move',  " Y :" + accellMove.y + " X :" + accellMove.x );

    }
