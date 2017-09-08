const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const AllBot = require('allbot');
const ApiAI = require('apiai');

const ApiAiHandler = require('./controllers/apiaiwebhook');

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

const apiai = ApiAI("dd9ed8a22ddb4196aa649c9f1cd29681");

// Add this
allBot.onMessage((sessionKey,message) => {

  const textReceived = message.content.text;

  console.log('message',JSON.stringify(message, null, 3));  
  console.log('textReceived',textReceived);

  requestApiAI = apiai.textRequest(textReceived, {
    sessionId: userIdChunks[2]
  });

  requestApiAI.on('response', function(response) {

    console.log('API AI response',JSON.stringify(response, null, 3));

    const replyFromAI = response.result.fulfillment.speech;

    if(replyFromAI && replyFromAI.length > 0)
      allBot.replyText(sessionKey,response.result.fulfillment.speech);
    else
      allBot.replyText(sessionKey,"Sorry cannot process your message.");

  });

  requestApiAI.on('error', function(error) {
    console.log(error);
    allBot.replyText(sessionKey,"Sorry please send again.");
  });

  requestApiAI.end();

});

app.get('/', function (req, res) {
  res.send('clover bot top')
});

app.use(configuration.allbot.endpointURL, allBot.router);
app.use(configuration.allbot.endpointURL + '/apiai', apiAIHandler.router);

app.listen(configuration.port, function () {
    console.log('Weater bot is listening on port ' + configuration.port)
})
