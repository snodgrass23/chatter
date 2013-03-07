var chatter = require('../index'),
    stdin = process.stdin,
    stdout = process.stdout,
    username = "";

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var chatter_client = new chatter.client("http://chatterjs.herokuapp.com");

rl.question("\033[35m Enter Your Usename: \033[39m ", function(answer) {
  username = answer.replace("\n", "");

  rl.close();

  console.log("\n\n\033[33mChatroom:\033[39m");

  chatter_client.getRecentHistory();
  chatter_client.on('message', receiveMessage);

  process.nextTick(waitForMessage);
});


function waitForMessage() {
  stdin.resume();
  stdin.setEncoding('utf8');

  writeUsername();

  // when data is submitted by user
  stdin.on('data', sendMessage);
}

function sendMessage(message) {
  writeUsername();
  chatter_client.send(message.replace("\n", ""), username);
}

function receiveMessage(message) {
  if (typeof message == "string") {
    try {
      message = JSON.parse(message);
    }
    catch(e) {
      // console.log("JSON Error: ", e);
    }
  }
  writeMessage(message);
}

function writeMessage(message, user) {
  stdout.clearLine();
  stdout.write("\r\033[0K");
  console.log("\033[32m" + message.user + "\033[39m : " + message.body);
  writeUsername();
}

function writeUsername() {
  stdout.write("\033[32m" + username + "\033[39m : ");
}