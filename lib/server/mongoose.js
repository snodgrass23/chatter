var mongoose = require('mongoose');

module.exports = function(config) {
  // only connect once
  if (mongoose.connection.readyState !== 0) return;

  var connectString = process.env.MONGOLAB_URI || 'mongodb://localhost/chatter';

  // Ensure safe writes
  var mongoOptions = { db: { safe: true }};

  mongoose.connect(connectString, mongoOptions, function(err, res) {
    if (err) {
      console.log ('ERROR connecting to: ' + connectString + '. ' + err);
    } else {
      console.log ('Mongoose connected to: ' + connectString);
    }
  });
};