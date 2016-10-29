var bluemix = require('./bluemix.js');
var watson = require('watson-developer-cloud');
var extend = require('util')._extend;
var fs = require ('fs');

var WebSocket = require('ws');


var credentials = extend({
   version: 'v1',
   username: '96770b7b-aa71-4934-96da-f9e0cd5ac633',
   password: 'mmydcMqvcZhs'
}, bluemix.getServiceCreds('speech_to_text'));

var authorization = watson.authorization({
  username: credentials.username,
  password: credentials.password,
  version: 'v1',
  url: 'https://stream.watsonplatform.net/authorization/api'
});

var params = {
    url: 'https://stream.watsonplatform.net/speech-to-text/api'
};
var getWSURI = function (callback){
    authorization.getToken(params, function (err, token) {
       var wsURI = "wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize?watson-token=" + token
            + "&model=en-US_BroadbandModel";
        callback(wsURI);
    });
}

getWSURI(function webSocketClient(wsURI){
     var websocket = new WebSocket(wsURI);

        websocket.onopen = function onOpen() {

            var message = {
                action: 'start',
                'content-type': 'audio/wav;rate=44100',
                interim_results: Boolean(1),
                continuous: Boolean(1),
                inactivity_timeout: 600
            };

            websocket.send(JSON.stringify(message));
            fs.readFile('sample1.wav', function read(err, data) {
                if (err) {
                    throw err;
                }
                websocket.send(data);

            });
        };

        websocket.onmessage = function onMessage(evt) {
            console.log(JSON.stringify(evt.data,null,2));
        }

})
