# Chatter

An npm module for creating chat servers and clients.

``` bash
npm install chatter
```

### Chat Server

``` javascript
var chatter = require('chatter');
var chat_server = new chatter.server();

chat_server.publish('I am a new message');
```


### Server Side Chat Client

``` javascript
var chatter = require('chatter');
var chat_client = new chatter.client();
chat_client.on('message', function(message) {

});
```

### Client Side Chat Client

``` html
<script src="http://mywebserver.com/chatter/chatter.js"></script>
```
``` javascript
var client = chatter.connect('http://mywebserver.com/');
client.on('message'. function(data) {
  console.log(data);
});
```