/**
 * Client
 * @author Jim Snodgrass
 */


var EventEmitter = require('events').EventEmitter,
    net = require('net'),
    util = require('util');


function Client(options) {
  this.options = options || {};

  var host = this.options.host || '127.0.0.1';
  var port = this.options.port || 8000;

  var socket = net.createConnection(port, host);

  socket.on('connect', function() {
    console.log("Connected to Chatter server at "+host+":"+port);
  });

  socket.on('data', function(data) {
    console.log("client received data: ", data);
  });

  socket.on('end', function() {
    console.log("Lost connection to Chatter server");
  });

}

util.inherits(Client, EventEmitter);

Client.prototype.send = function(message) {
  // this.emit("new_message", message);
};

module.exports = Client;