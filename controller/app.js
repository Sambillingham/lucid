var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , osc = require('node-osc');

var left = false,
    right = false,
    forward = false,
    backward = false,
    aRandomVar = 0;

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

    socket.on('rollX', function (data) {

        if (data > -70 && data < 0) {
            //console.log('left: ' + (Math.abs(2*(Math.round(data/10)))));

            
            client.send('/left', (Math.abs(2*(Math.round(data/10)))));
            console.log('sending OSC LEFT: ', (Math.abs(2*(Math.round(data/10)))));
        } 
        if (data < 70 && data > 0 ) {
            client.send('/right', (Math.abs(2*(Math.round(data/10)))));
            console.log('sending OSC RIGHT: ', (Math.abs(2*(Math.round(data/10)))));
        }
        //console.log(' Device Roll X: ', data);
    });

    socket.on('rollY', function (data) {

        if (data > -70 && data < 0) {
            client.send('/forward', (Math.abs(2*(Math.round(data/10)))));
            console.log('sending OSC FORWARD: ', (Math.abs(2*(Math.round(data/10)))));
        } 
        if (data < 70 && data > 0 ) {
            client.send('/back', (Math.abs(2*(Math.round(data/10)))));
            console.log('sending OSC BACK: ', (Math.abs(2*(Math.round(data/10)))));
        }
    });

    socket.on('direction', function (data) {
        console.log(' Device Direction : ', data);
    });


   // socket.emit('screenDisplay', aRandomVar) {

   // });

});




client.send('/right', 200);

client.send('/forward', 200);
client.send('/backward', 200);




