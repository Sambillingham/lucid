$(function(){var e=io.connect("http://192.168.0.20:8080"),t={move:!1,look:!1},n={x:0,y:0,d:0};e.on("connect",function(){$("#welcome").removeClass("disconnected").addClass("connected");e.on("selectedPlayer",function(e){e.move===!0&&e.look===!1&&$("#move").html("Move");e.look===!0&&e.move===!1&&$("#look").html("Looking")});e.on("disconnect",function(){$("#welcome").html("Disconnected").removeClass("connected").addClass("disconnected");$("#move").html("");$("#love").html("")})});if(window.DeviceMotionEvent!==undefined){$("#welcome").removeClass("notMobile");window.ondeviceorientation=function(r){var i=Math.floor(r.alpha),s=Math.floor(r.beta),o=Math.floor(r.gamma);if(t.move===!0){n.x=o;n.y=s;e.emit("sendMoveAccellValues",n)}if(t.look===!0){n.x=o;n.y=s;n.d=i;e.emit("sendLookAccellValues",n)}}}else $("#welcome").addClass("notMobile").append("<h1> I'm sorry Lucid controllers require a mobile device</h1>");$("#moveClick").click(function(){t.move=!0;t.look=!1;e.emit("player",t)});$("#lookClick").click(function(){t.move=!1;t.look=!0;e.emit("player",t)});$("#lookSelect").click(function(){window.location="/look"});$("#moveSelect").click(function(){window.location="/move"})});