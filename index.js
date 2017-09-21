const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const AllBot = require('allbot');
const ApiAI = require('apiai');

const SpikaSDK = require('./spika');
const init = require('./init');

const ApiAiHandler = require('./controllers/apiaiwebhook');
const SpikaHandler = require('./controllers/SpikaWebhook');

const rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}
app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: function () { return true } }));
app.use(function(req, res, next) {
  var data = '';
  req.on('data', function(chunk) { 
    data += chunk;
  });
  req.on('end', function() {
    req.rawBody = data;
  });
  next();
});

const configuration = require('./init');
const allBot = new AllBot(configuration.allbot);
const apiAIHandler = new ApiAiHandler();
const spikaHandler = new SpikaHandler();

const apiai = ApiAI("dd9ed8a22ddb4196aa649c9f1cd29681");

// Add this
allBot.onMessage((sessionKey,message) => {

  const textReceived = message.content.text;
  const userIdChunks = message.userIdentifier.split(':');
  const serviceId = userIdChunks[1];
  const userId = userIdChunks[2];

  console.log(userId);

  if(userIdChunks[0] == 'skype'){

    const skypeUserIdJson = JSON.parse(userId);
    console.log(skypeUserIdJson);
    userId = skypeUserIdJson.from.id;

  }

  console.log(message);
  console.log('message',JSON.stringify(message, null, 3));  
  console.log('textReceived',textReceived);

  SpikaSDK.init(init.spika.url,init.spika.apiKey);
  
  const promise = new Promise((fulfill, reject) => {
  
    SpikaSDK.signinAsGuest(
        init.spika.org,
        message.userIdentifier,
        message.userIdentifier,(statusCode,body) => {
        
      if(statusCode == 200){
        fulfill(body);
      }else{
        reject(body);
      }
    });
  
  }).then((signinBody) => {
  
    return new Promise((fulfill,reject) => {
  
      setTimeout(() => {

          SpikaSDK.sendMessage(1,init.spika.supportuserid,1,textReceived,null,(statusCode,body) => {
      
              if(statusCode == 200){
                  fulfill(body);
              }else{
                  reject(body);
              }
              
          });
      },3000);
  
    });
  
  }).then( (sendBody) => {
  
    console.log("bot message sent",sendBody);
  
  });

});

global.allbot = allBot;

app.get('/', function (req, res) {
  res.send('clover bot top')
});

app.use(configuration.allbot.endpointURL, allBot.router);
app.use(configuration.allbot.endpointURL + '/apiai', apiAIHandler.router);
app.use(configuration.allbot.endpointURL + '/spika', spikaHandler.router);

app.listen(configuration.port, function () {
    console.log('Weater bot is listening on port ' + configuration.port)
})

