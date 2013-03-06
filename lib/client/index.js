/**
 * Client
 * @author Jim Snodgrass
 */


var EventEmitter = require('events').EventEmitter,
    superagent = require('superagent'),
    util = require('util'),
    prev_length = 0;


function Client(options) {
  this.options = options || {};

  this.host = this.options.host || 'localhost';
  this.port = this.options.port || 8000;

  this.agent = superagent.agent();

  this.listenForMessages();

}

util.inherits(Client, EventEmitter);

Client.prototype.send = function(message) {
  this.emit("new_message", message);
};

Client.prototype.listenForMessages = function() {
  var self = this;

  setTimeout(function() {
    self.agent.get(self.host+':'+self.port).end(function(err, res) {
      self.send(res.text);
      self.listenForMessages.call(self);
    });
  }, 3000);
};

module.exports = Client;