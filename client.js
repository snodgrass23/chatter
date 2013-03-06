var chatter = require('./index'),
    stdin = process.stdin,
    stdout = process.stdout;

var chatter_client = new chatter.client();

chatter_client.on('new_message', function (message) {
  if (typeof message == "string") {
    message = JSON.parse(message);
  }
  console.log("new message: ", message.length, message);
});

