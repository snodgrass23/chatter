# Chatter

An npm module for creating chat servers and clients.

Check out the examples directory for CLI server and client apps.

### Install with npm

``` bash
npm install chatter
```

### Chat Server



``` javascript
var chatter = require('chatter');
var options = {
  port: process.env.PORT || 8000
}
var chatter_server = new chatter.server(options);
```


### Server Side Chat Client

``` javascript
var chatter = require('chatter');
var chatter_client = new chatter.client("http://chatterjs.herokuapp.com");

// get last 10 messages in transcript
chatter_client.getRecentHistory();

// start listening for new messages
chatter_client.listenForMessages();

chatter_client.on('message', function(message) {
  console.log(message);
});
chatter_client.send('Hello World', 'Jim');
```

### Client Side Chat Client

``` html
<script src="http://mywebserver.com/chatter/chatter.js"></script>
```
``` javascript
var client = chatter.connect('http://chatterjs.herokuapp.com');
client.on('message'. function(data) {
  console.log(data);
});

client.send("Hello World!", "Jim");
```