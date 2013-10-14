var mongoose = require('mongoose');

module.exports = function() {

  var Message = new mongoose.Schema({
    user      : { type: String, trim: true, required:true },
    body      : { type: String, trim: true, required:true },
    timestamp : {type: Number, 'default': Date.now() }
  }, {strict:true});


  Message.path('body').set(function(body) {
    return body.replace(/&/g,'&amp;').replace(/</g,'').replace(/>/g,'');
  });

  // Export

  return mongoose.model('Message', Message);

};