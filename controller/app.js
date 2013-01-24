var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    osc = require('node-osc');

var XRoll = 0,
    YRoll = 0,
    player1 = 0,
    player2 = 0,
    player1Taken = false,
    player2Taken = false,
    lookX = 0,
    lookY = 0,
    lookDirection = 0;

var client = new osc.Client('192.168.0.5', 3333);

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


io.sockets.on('connection', function (socket) {
    console.log('player connected');
    socket.emit('playerID', socket.id);
    

    

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

    socket.on('moveRollX', function (data) {
        if (data > 10 || data < -10){
        XRoll = data;
        sendOSCMove();
      } else {
        XRoll = 0;
        sendOSCMove();
      }
        
        
    });

    socket.on('moveRollY', function (data) {
      if (data > 10 || data < -10){
      YRoll = data;
        sendOSCMove();
      } else {
        YRoll = 0;
        sendOSCMove();
      }
    });

    //Sockets for look actions

    socket.on('lookRollX', function (data) {

        lookX = data;
        sendOSCLook();

        
    });

    socket.on('lookRollY', function (data) {
      
      lookY = data;
      sendOSCLook();
      
    });

    socket.on('lookDirection', function (data) {
      
      lookDirection = data;
      sendOSCLook();
      
    });

    // END look actions

   // socket.on('direction', function (data) {
       // console.log(' Device Direction : ', data);
   // });



});

function sendOSCMove(){
  client.send('/move', XRoll, YRoll);
  console.log('X and Y Axis Data',  "     X :" + XRoll + "     Y :" + YRoll );
}
function sendOSCLook(){
  client.send('/look', lookX, lookY, lookDirection);
  console.log('Looking Data', "     X :" + lookX + "     Y :" + lookY + ":     D :" + lookDirection );
}



