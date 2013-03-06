/**
 * Server
 * @author Jim Snodgrass
 */


var EventEmitter = require('events').EventEmitter,
    util = require('util');


function Server(options, fn) {

  this.options = options || {};
  this.fn = fn || function(req, res) {
    console.log("test response");
  };
  this.server = require('http').createServer();

  this.server.on('request', function(req, res) {
    console.log("default response to: " + req.url);
    res.writeHead(200);
    res.end('Welcome to Chatter');
  });

  var port = this.options.port || 8000;
  this.server.listen(port, this.fn);
  console.log("Chatter server listening on localhost:"+port);
}

util.inherits(Server, EventEmitter);


Server.prototype.send = function(message) {
  this.emit("new_message", message);
};


module.exports = Server;