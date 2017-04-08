var https = require("https");
var fs = require("fs");

var options = {
  host: 'stream-large-file.herokuapp.com',
  path: '/give-me-stuff-now'
};

var data = "";

// called by https when the request is made.
var callback = function(response) {
  console.log('In response handler callback!');
  // Response is a stream
  response.on('data', function(chunk) {
    //console.log('[-- CHUNK OF LENGTH ' + chunk.length + ' --]');
    //console.log(chunk.toString());
    data += chunk;
  });
  response.on("end", function(){
    var writerStream = fs.createWriteStream('output.txt');
    writerStream.write(data,'UTF8');
    writerStream.end();
  });
}
console.log("I'm about to make the request!");

https.request(options, callback).end();

console.log("I've made the request!");