/**
 * Client
 * @author Jim Snodgrass
 */


var EventEmitter = require('events').EventEmitter,
    superagent = require('superagent'),
    agent = superagent.agent(),
    util = require('util'),
    _ = require('underscore');

var last_received_message = {
      timestamp: 0,
      body: '',
      user: ''
    };

var last_sent_message = {
      timestamp: 0,
      body: '',
      user: ''
    };


function Client(host) {
  // poll for new messages
  this.listenForMessages();
  this.host = host;
}

util.inherits(Client, EventEmitter);

Client.prototype.getRecentHistory = function(host) {
  // get initial transcript
  var self = this;
  agent.get(self.host).end(function(err, res) {
    if (res) self.broadcast(res.text);
  });
};

Client.prototype.send = function(message, user) {
  last_sent_message.body = message;
  last_sent_message.user = user || "";
  agent.post(this.host+'/message')
            .send({message:message, user:user})
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
  if (lastOne && lastOne.timestamp) last_received_message = lastOne;

  var self = this;
  _.each(messages, function(m) {
    // make sure new message isn't reflection of own message
    if (m.body != last_sent_message.body && m.user != last_sent_message.user) {
      self.emit("message", m);
    }
  });
};

Client.prototype.listenForMessages = function() {
  var self = this;

  setTimeout(function() {
    agent.get(self.host + "/since/" + last_received_message.timestamp).end(function(err, res) {
      if (res) self.broadcast(res.text);
      self.listenForMessages.call(self);
    });
  }, 200);
};

module.exports = Client;