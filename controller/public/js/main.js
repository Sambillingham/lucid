$(function() {

    var socket = io.connect('http://169.254.16.1:8080');

            var whoAreYou = { move: false, look: false },
                accellValues = { x: 0, y: 0, d: 0 };

 
            socket.on('connect', function () {

                $('#welcome').removeClass("disconnected").addClass("connected");

                     
                socket.on('selectedPlayer', function (who) {

                        if ( who.move === true && who.look === false ) {

                                $('#move').html('Move');
                                
                        }

                        if ( who.look === true && who.move === false)  {

                                $('#look').html('Looking');
                                
                        }

                    
                });

                socket.on('disconnect', function () {

                       $('#welcome').html('Disconnected').removeClass("connected").addClass("disconnected");
                       $('#move').html('');
                       $('#love').html('');

                });

            });



            // Do we have accelerometer support?
            if (window.DeviceMotionEvent !== undefined) {

                $("#welcome").removeClass("notMobile");

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

                };


            } else {

                    // NO accelerometer support
                    $("#welcome").addClass("notMobile").append("<h1> I'm sorry Lucid controllers require a mobile device</h1>");

            }

            $("#move").click(function() {

                    whoAreYou.move = true;
                    whoAreYou.look = false;
                   
                    socket.emit('player', whoAreYou);
                   
             });

            $("#look").click(function() {

                    whoAreYou.move = false;
                    whoAreYou.look = true;
                   
                    socket.emit('player', whoAreYou);
                   
             });

            $("#lookSelect").click(function() {

                    window.location = '/look';
                   
             });

            $("#moveSelect").click(function() {

                    window.location = '/move';
                   
             });


});