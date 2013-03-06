var chatter = require('./index'),
    stdin = process.stdin,
    stdout = process.stdout;

var chatter_client = new chatter.client();

chatter_client.on('new_message', function (message) {
  console.log(message);
});

