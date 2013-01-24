var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    osc = require('node-osc');

var XRoll = 0,
    YRoll = 0,
    player1 = 0,
    player2 = 0,
    player1Taken = false,
    player2Taken = false;

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

    socket.on('rollX', function (data) {
        if (data > 10 || data < -10){
        XRoll = data;
        sendOSC();
      } else {
        XRoll = 0;
        sendOSC();
      }
        
        
    });

    socket.on('rollY', function (data) {
      if (data > 10 || data < -10){
      YRoll = data;
        sendOSC();
      } else {
        YRoll = 0;
        sendOSC();
      }
    });


    socket.on('direction', function (data) {
       // console.log(' Device Direction : ', data);
    });


   // socket.emit('screenDisplay', aRandomVar) {

   // });

});

function sendOSC(){
  client.send('/move', XRoll, YRoll);
  console.log('X and Y Axis Data', XRoll + ":     :" + YRoll );
}




