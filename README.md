# mira
# Getting Setup
1. You need to have the latest versions of [Node.JS](https://nodejs.org/en/)/npm and [Git](https://git-scm.com/dowloads).
2. Install watson developer cloud  library for NodeJS 
     ``` 
     $ npm install watson-developer-cloud --save
     ```
3. Create [IBM Bluemix](https://new-console.ng.bluemix.net/) account 
4. Activate Speech-To-Text service
5. Add username&password provided by Speech-To-Text service after it has been activated to the following code snippet
```js
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');
 
var speech_to_text = new SpeechToTextV1({
  password: "",
  username: ""
});


 
var params = {
  // From file 
  audio: fs.createReadStream('speech.wav'),
  content_type: 'audio/l16; rate=44100'
};
 
speech_to_text.recognize(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});
 
// or streaming 
fs.createReadStream('speech.wav')
  .pipe(speech_to_text.createRecognizeStream({ content_type: 'audio/l16; rate=44100' }))
  .pipe(fs.createWriteStream('transcription.txt'));
```
