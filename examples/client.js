var chatter = require('../index'),
    stdin = process.stdin,
    stdout = process.stdout;

var connection = {
  host: "http://chatterjs.herokuapp.com",
  port: 80
};

var chatter_client = new chatter.client(connection);

chatter_client.on('message', function (message) {
  if (typeof message == "string") {
    try {
      message = JSON.parse(message);
    }
    catch(e) {
      // console.log("JSON Error: ", e);
    }
  }
  console.log("\033[32m" + message.user + "\033[39m : " + message.body);
});

process.nextTick(waitForMessage);

function waitForMessage() {
  stdin.resume();
  stdin.setEncoding('utf8');

  // when data is submitted by user
  stdin.on('data', sendMessage);
}

function sendMessage(message) {
  chatter_client.send(message.replace("\n", ""), "Jim");
}