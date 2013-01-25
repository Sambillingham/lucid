var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    osc = require('node-osc');

var XRoll = 0,
    YRoll = 0,
    player1 = 0,
    player2 = 0,
    player1Taken = false,
    player2Taken = false,
    lookZ = 0,
    lookX = 0,
    lookY = 0;

var client = new osc.Client('192.168.0.5', 3333);



server.listen(8080);

app.configure(function() {

  app.use(express.static(__dirname + '/public'));

});

app.get('/', function (req, res) {

  switch(req.url) {
    case '/':
    case '/index.html':
      res.sendfile(__dirname + '/index.html');
    break
    

  }
});


io.sockets.on('connection', function (socket) {
    console.log('player connected');
    socket.emit('playerID', socket.id);
    

    //Sockets for Player Selection

    socket.on('iamplayer1', function(data) {

      player1 = data;
      console.log("Player1: " + player1 + ":     :" + "Player2: " + player2);
      socket.emit('youArePlayer1' );

    });

    socket.on('iamplayer2', function(data) {

      player2 = data;
      console.log("Player1: " + player1 + ":     :" + "Player2: " + player2);
      socket.emit('youArePlayer2' );

    });
    // END Player Selection

    // Sockets for Move Actions

    socket.on('moveRollX', function (data) {
        
        XRoll = data;
        sendOSCMove();
        
    });

    socket.on('moveRollY', function (data) {

      if (data > 10 || data < -10) {

        YRoll = data;
        sendOSCMove();

      } else {

        YRoll = 0;
        sendOSCMove();

      }
    });
    // END Move actions

    // Sockets for look actions

    socket.on('lookRollX', function (data) {

      lookZ = data;
      sendOSCLook();

        
    });

    socket.on('lookRollY', function (data) {
      
      lookX = data;
      sendOSCLook();
      
    });

    socket.on('lookDirection', function (data) {
      
      lookY = data;
      sendOSCLook();
      
    });

    // END look actions

});

function sendOSCMove(){
  client.send('/move', XRoll, YRoll);
  console.log('X and Y Axis Data',  "     X :" + XRoll + "     Y :" + YRoll );
}
function sendOSCLook(){
  client.send('/look', lookZ, lookX, lookY);
  console.log('Looking Data', "     Z :" + lookZ + "     X :" + lookX + ":     Y :" + lookY );
}



