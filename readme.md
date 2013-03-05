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


### Chat Client

``` javascript
var chatter = require('chatter');
var chat_client = new chatter.client();
chat_client.on('message', function(message) {

});
```