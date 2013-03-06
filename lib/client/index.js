/**
 * Client
 * @author Jim Snodgrass
 */


var EventEmitter = require('events').EventEmitter,
    superagent = require('superagent'),
    util = require('util'),
    _ = require('underscore');

var last_received_message = {
      timestamp: 0,
      body: ''
    };

var last_sent_message = {
      timestamp: 0,
      body: ''
    };


function Client(options) {
  this.options = _.defaults(options || {}, {
    host: 'localhost',
    port: 8000
  });


  this.agent = superagent.agent();

  // get initial transcript
  var self = this;
  this.agent.get(self.options.host+':'+self.options.port).end(function(err, res) {
    if (res) self.broadcast(res.text);
  });

  // listen for new messages
  this.listenForMessages();

}

util.inherits(Client, EventEmitter);

Client.prototype.send = function(message) {
  last_sent_message.body = message;
  this.agent.post(this.options.host+':'+this.options.port+'/message')
            .send({message:message})
            .end(function(err, res) {
    // after create
  });
};

Client.prototype.broadcast = function(messages) {
  try {
    messages = JSON.parse(messages);
  }
  catch(e) {
    console.log("json error:", e);
  }

  var lastOne = messages[messages.length - 1];
  if (lastOne) last_received_message = lastOne;

  var self = this;
  _.each(messages, function(m) {
    if (m.body == last_sent_message.body) {
      last_sent_message.body = "";
    }
    else {
      self.emit("new_message", m);
    }
  });
};

Client.prototype.listenForMessages = function() {
  var self = this;

  setTimeout(function() {
    self.agent.get(self.options.host+':'+self.options.port + "/since/" + last_received_message.timestamp).end(function(err, res) {
      if (res) self.broadcast(res.text);
      self.listenForMessages.call(self);
    });
  }, 200);
};

module.exports = Client;