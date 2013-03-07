# Chatter

An npm module for creating chat servers and clients.

Check out the examples directory for CLI server and client apps.

### Install with npm

``` bash
npm install chatter
```

### Node Server



``` javascript
var chatter = require('chatter');
var options = {
  port: process.env.PORT || 8000
}
var chatter_server = new chatter.server(options);
```


### Node Client

``` javascript
var chatter = require('chatter');
var chatter_client = new chatter.client("http://chatterjs.herokuapp.com");

// get last 10 messages in transcript
chatter_client.getRecentHistory();

// start listening for new messages
chatter_client.on('message', function(message) {
  console.log(message);
});

// send new message with body and user
chatter_client.send('Hello World', 'Jim');
```

### Front-End Client

*requires "JQuery-like" library for ajax calls. Primary testing done using zepto.js*

``` html
<script src="http://chatterjs.herokuapp.com/chatter/chatter.js"></script>
```
``` javascript
// first argument is host server, second is callback for new messages
// last argument is optional for polling interval
chatter.connect('http://chatterjs.herokuapp.com', function(data) {
  console.log("handling new message: ", data);
}, 500);

// method to get last 10 messages in room
chatter.getRecentHistory();

chatter.send("Hello World!", "Client");
```