var chatter = require('./index');
var chatter_server = new chatter.server();

chatter_server.on('new_message', function(message) {
  console.log("got new message: ", message);
});


setTimeout(function() {
  var message = "Hello World";
  console.log("sending message: "+message);
  chatter_server.send(message);
}, 1000);