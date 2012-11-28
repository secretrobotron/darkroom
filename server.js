var express = require('express'),
    knox = require('knox'),
    config = require('config'),
    uuid = require('node-uuid');
    app = express();

app.use(express.logger())
   .use(express.static(__dirname + '/public'));

var knoxClient;

if(config.s3){
  knoxClient = knox.createClient(config.s3);
  app.listen(8080);
  app.post('/save', function(req, res){
    var dataString = '';

    req.on('data', function(data){
      dataString += data.toString();
    });

    req.on('end', function(){
      var regexMatch = dataString.match(/data:image\/(jpg|jpeg|png|gif);base64,/);

      if(!regexMatch){
        res.json({error: 'Invalid data'}, 500);
        return;
      }

      dataString = dataString.substr(regexMatch[0].length);

      var byteBuffer = new Buffer(dataString, 'base64');

      var knoxReq = knoxClient.put(uuid.v4(), {
        'Content-Length': byteBuffer.length,
        'Content-Type': 'image/' + regexMatch[1]
      });

      knoxReq.on('response', function(s3res){
        if (200 == s3res.statusCode) {
          res.json({error: null, data: knoxReq.url}, 200);  
        }
        else {
          res.json({error: s3res.statusCode}, s3res.statusCode);
        }
      });

      knoxReq.end(byteBuffer);

    });
  });

}
else {
  console.log('Error: Missing S3 configuration.');
}

