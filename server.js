var chatter = require('./index'),
    stdin = process.stdin,
    stdout = process.stdout;


var chatter_server = new chatter.server();

process.nextTick(waitForMessage);

function waitForMessage() {
  console.log("Send Messages");
  stdin.resume();
  stdin.setEncoding('utf8');

  // when data is submitted by user
  stdin.on('data', sendMessage);
}

function sendMessage(message) {
  chatter_server.send(message);
}

