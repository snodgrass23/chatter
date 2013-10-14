/**
 * Server
 * @author Jim Snodgrass
 */
var express = require('express'),
    app = express(),
    _ = require('underscore'),
    EventEmitter = require('events').EventEmitter,
    util = require('util'),
    chatroom = require('./chatroom');


function Server(options, fn) {

  // connect to mongo server
  require('./mongoose')();

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
    chatroom.recentMessages(req.param('limit'), function(err, result) {
      res.send(result);
    });
  });

  app.get('/since/:timestamp', cors, function(req, res){
    chatroom.messagesSince(req.params.timestamp, function(err, result) {
      console.log(err, result);
      res.send(result);
    });
  });

  app.post('/message', cors, function(req, res){
    chatroom.addMessage({body:req.body.message, user:req.body.user}, function(err, result) {
      res.send(result);
    });
  });

  app.listen(this.options.port);
  console.log("Chatter server listening on "+this.options.host+":"+this.options.port);
}

util.inherits(Server, EventEmitter);


module.exports = Server;