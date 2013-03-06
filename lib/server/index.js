/**
 * Server
 * @author Jim Snodgrass
 */


var EventEmitter = require('events').EventEmitter,
    express = require('express'),
    app = express(),
    _ = require('underscore'),
    util = require('util');

var messages = [];


function Server(options, fn) {

  this.options = options || {};


  app.get('/', function(req, res){
    res.send(messages);
  });

  app.get('/since/:timestamp', function(req, res){
    var start_index = null;

    for (var i = 0, length = messages.length; i < length; i++) {
      if (messages[i].timestamp > req.params.timestamp) {
        start_index = i;
        break;
      }
    }

    if (start_index !== null) {
      res.send(messages.slice(start_index));
    }
    else {
      res.send([]);
    }
  });

  app.post('/message', function(req, res){
    addMessage(req.body.message);
    res.send("success");
  });


  var host = this.options.host || '127.0.0.1',
      port = process.env.PORT || this.options.port || 8000;

  app.listen(port);
  console.log("Chatter server listening on "+host+":"+port);
}

util.inherits(Server, EventEmitter);


Server.prototype.send = function(message) {
  addMessage(message);
};


function addMessage(message) {
  messages.push({ timestamp: Date.now(), message: message.replace("\n", "")});
}

module.exports = Server;