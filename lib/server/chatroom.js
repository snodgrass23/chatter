var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    Message = require('./message')();


function Chatroom() {

}

util.inherits(Chatroom, EventEmitter);

Chatroom.prototype.addMessage = function(options, callback) {
  var new_message = new Message({ body: options.body, user: options.user});
  new_message.save(callback);
};

Chatroom.prototype.recentMessages = function(num, callback) {
  Message.find()
          .sort('-timestamp')
          .limit(num || 20)
          .exec(callback);
};

Chatroom.prototype.messagesSince = function(timestamp, callback) {
  Message.find()
          .where('timestamp').lt(timestamp)
          .exec(callback);
};


module.exports = new Chatroom();





