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

  this.options = _.defaults(options || {}, {
    host: 'localhost',
    port: 8000
  });

  app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('chatter'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(require('path').join(__dirname, 'client')));
  });

  app.get('/', function(req, res){
    res.send(messages.slice(-10));
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
    if(req.body && req.body.message) addMessage(req.body.message, req.body.user);
    res.send("success");
  });

  app.listen(this.options.port);
  console.log("Chatter server listening on "+this.options.host+":"+this.options.port);
}

util.inherits(Server, EventEmitter);


Server.prototype.send = function(message) {
  addMessage(message);
};


function addMessage(message, user) {
  messages.push({ timestamp: Date.now(), body: message, user: user});
}

module.exports = Server;