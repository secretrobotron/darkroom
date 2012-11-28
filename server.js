var express = require('express'),
    knox = require('knox'),
    config = require('config'),
    app = express();

app.use(express.logger())
   .use(express.static(__dirname + '/public'));

console.log(config);


var knoxClient = knox.createClient();

app.listen(8080);
