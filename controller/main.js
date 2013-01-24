  $(function() {

    var socket = io.connect('192.168.0.20');

            var accellDataX = 0,
                accellDataY = 0,
                accellDataZ = 0,
                accellDataXYZ = 0,
                myid = 0;
            
               // $("#data1").html(gpsnum1);

 
            socket.on('connect', function () {
                    $('#welcome').html("Sockets Bitches");
                     
                 socket.on('playerID', function(data) {
                     $("#welcome").append(data);
                     myid = data;
                 });


                socket.on('disconnect', function() {
                    $('#welcome').html('Disconnected');
                    socket.emit('idis , myid ');
                });
            });



    // Do we have accelerometer support?
    if (window.DeviceMotionEvent !== undefined) {

        // Gyrate
        window.ondeviceorientation = function(event) {

            // Get compass data
            var deviceDirection = event.alpha,
                deviceRollY     = event.beta,
                deviceRollX     = event.gamma;
            
            socket.emit('rollX' , Math.floor(deviceRollX));
            socket.emit('rollY' , Math.floor(deviceRollY));
            socket.emit('direction' , Math.floor(deviceDirection));


        }

    } else {

        // We don't have accelerometer support
        $("#welcome").append("<h1>No gyro, Bro. Try again in Mobile Safari.</h1>");

    }

     

});
    