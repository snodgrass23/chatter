var chatter = require('../index'),
    stdin = process.stdin,
    stdout = process.stdout;

var chatter_client = new chatter.client();

chatter_client.on('new_message', function (message) {
  if (typeof message == "string") {
    message = JSON.parse(message);
  }
  console.log(message.body);
});

process.nextTick(waitForMessage);

function waitForMessage() {
  stdin.resume();
  stdin.setEncoding('utf8');

  // when data is submitted by user
  stdin.on('data', sendMessage);
}

function sendMessage(message) {
  chatter_client.send(message.replace("\n", ""));
}