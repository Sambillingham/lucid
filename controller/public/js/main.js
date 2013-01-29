$(function() {

    var socket = io.connect('http://192.168.0.20');

            var whoAreYou = { move: false, look: false },
                accellValues = { x: 0, y: 0, d: 0 };

 
            socket.on('connect', function () {

                $('#welcome').append("Sockets Bitches").removeClass("disconnected").addClass("connected");

                     
                socket.on('selectedPlayer', function (who) {

                        if ( who.move === true && who.look === false ) {

                                $('#welcome').html('MOVE');
                                
                        }

                        if ( who.look === true && who.move === false)  {

                                $('#welcome').html('LOOK');
                                
                        }

                    
                });

                socket.on('disconnect', function () {

                       $('#welcome').append('Disconnected').removeClass("connected").addClass("disconnected");

                });

            });



            // Do we have accelerometer support?
            if (window.DeviceMotionEvent !== undefined) {

                // Gyrate
                window.ondeviceorientation = function(event) {

                    var deviceDirection = Math.floor(event.alpha),
                        deviceRollY     = Math.floor(event.beta),
                        deviceRollX     = Math.floor(event.gamma);
                    
                    if ( whoAreYou.move === true ){

                            accellValues.x = deviceRollX;
                            accellValues.y = deviceRollY;

                            socket.emit('sendMoveAccellValues' , accellValues );


                    }

                    if ( whoAreYou.look === true ){

                            accellValues.x = deviceRollX;
                            accellValues.y = deviceRollY;
                            accellValues.d = deviceDirection;

                            socket.emit('sendLookAccellValues' , accellValues );
                    }

                }


            } else {

                    // NO accelerometer support
                    $("#welcome").append("<h1>No gyro, Bro. Try again in Mobile Safari.</h1>");

            }

            $("#moveClick").click(function() {

                    whoAreYou.move = true;
                    whoAreYou.look = false;
                   
                    socket.emit('player', whoAreYou);
                   
             });

            $("#lookClick").click(function() {

                    whoAreYou.move = false;
                    whoAreYou.look = true;
                   
                    socket.emit('player', whoAreYou);
                   
             });


});