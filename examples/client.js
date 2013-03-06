var chatter = require('../index'),
    stdin = process.stdin,
    stdout = process.stdout,
    username = "";

var chatter_client = new chatter.client("http://chatterjs.herokuapp.com");

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

process.nextTick(askForUsername);

function askForUsername() {
  stdin.resume();
  stdin.setEncoding('utf8');

  stdout.write("  Enter Your Usename: ");
  // when data is submitted by user
  stdin.on('data', setUsername);
}

function setUsername(string) {
  stdin.pause();

  stdin.removeListener('data', setUsername);

  username = string.replace("\n", "");

  chatter_client.getRecentHistory();
  chatter_client.listenForMessages();

  process.nextTick(waitForMessage);
}


function waitForMessage() {
  stdin.resume();
  stdin.setEncoding('utf8');

  // when data is submitted by user
  stdin.on('data', sendMessage);
}

function sendMessage(message) {
  chatter_client.send(message.replace("\n", ""), username);
}