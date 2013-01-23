var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , osc = require('node-osc');

var left = false,
    right = false,
    forward = false,
    backward = false,
    aRandomVar = 0;

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

    socket.on('rollX', function (data) {

        if (data > -70 && data < 0) {
            console.log('left' + (2*(Math.round(data/10))));
        } 
        if (data < 70 && data > 0 ) {
            console.log('right' + (2*(Math.round(data/10))));
        }
        //console.log(' Device Roll X: ', data);
    });

    socket.on('rollY', function (data) {
        if (data < 0){
            console.log('forward');
        } else {
            console.log('back');
        }
    });

    socket.on('direction', function (data) {
        console.log(' Device Direction : ', data);
    });


   // socket.emit('screenDisplay', aRandomVar) {

   // });

});

var client = new osc.Client('127.0.0.1', 3333);
if ( left == true){
    client.send('/left', 200);

}

client.send('/right', 200);

client.send('/forward', 200);
client.send('/backward', 200);




