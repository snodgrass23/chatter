var chatter = require('../index'),
    stdin = process.stdin,
    stdout = process.stdout,
    username = "",
    buffer = "";

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var chatter_client = new chatter.client("http://chatterjs.herokuapp.com");

rl.question("\033[35m Enter Your Username: \033[39m ", function(answer) {
  username = answer.replace("\n", "");

  rl.close();

  console.log("\n\n\033[33mChatroom:\033[39m general chat\n");

  chatter_client.getRecentHistory();
  chatter_client.on('message', receiveMessage);

  process.nextTick(waitForMessage);
});


function waitForMessage() {
  stdin.resume();
  stdin.setEncoding('utf8');
  stdin.setRawMode(true);

  writeUsername();

  stdin.on('keypress', function (chunk, key) {

    if (key && key.ctrl && key.name == 'c') return process.exit();

    // handle
    if (key && (key.name == 'backspace' || key.name == 'delete')) {
      if (buffer.length > 0) {
        buffer = buffer.slice(0, buffer.length - 1);
        return stdout.write("\033[1D \033[1D");
      }
      else {
        return;
      }
    }

    if (key && key.name == "enter") return sendMessage(buffer);

    buffer += chunk;
    stdout.write(chunk);
  });
}

function sendMessage(message) {
  buffer = "";
  stdout.write("\n");
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
  stdout.write(buffer);
}

function writeUsername() {
  stdout.write("\033[32m" + username + "\033[39m : ");
}