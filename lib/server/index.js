/**
 * Server
 * @author Jim Snodgrass
 */


var EventEmitter = require('events').EventEmitter,
    http = require('http'),
    util = require('util');

var messages = [];


function Server(options, fn) {

  this.options = options || {};

  var server = http.createServer(function(req, res) {
    console.log("got request");
    res.end(messages.join("\n")+"\n\n");
  });

  var host = this.options.host || '127.0.0.1';
  var port = this.options.port || 8000;
  server.listen(port);
  console.log("Chatter server listening on "+host+":"+port);
}

util.inherits(Server, EventEmitter);


Server.prototype.send = function(message) {
  this.emit("new_message", message);
};


module.exports = Server;