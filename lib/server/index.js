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
    app.use('/chatter', express.static(__dirname + '/../../chatter_client'));
  });

  // add cors support
  function cors(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  }

  app.get('/', cors, function(req, res){
    res.send(messages.slice(-20));
  });

  app.get('/since/:timestamp', cors, function(req, res){
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

  app.post('/message', cors, function(req, res){
    var result = null;
    if(req.body && req.body.message) result = addMessage(req.body.message, req.body.user);
    res.send(result);
  });

  app.listen(this.options.port);
  console.log("Chatter server listening on "+this.options.host+":"+this.options.port);
}

util.inherits(Server, EventEmitter);


function addMessage(message, user) {
  var new_message = { timestamp: Date.now(), body: safe_tags(message), user: user};
  messages.push(new_message);
  return new_message;
}

function safe_tags(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'').replace(/>/g,'') ;
}

module.exports = Server;