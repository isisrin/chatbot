var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,//process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD//process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

//테스트용
server.get('/', (req, res) => {
  res.send(`Hello World! ${process.env.MICROSOFT_APP_ID}`);
});


// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector);
// var bot = new builder.UniversalBot(connector, function (session) {
//     session.send("You said: %s", session.message.text);
// });

bot.dialog('/', [
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    },
    function (session, results) {
      var msg = new builder.Message(session)
            .text("Thank you for expressing interest in our premium golf shirt! What color of shirt would you like?")
            .suggestedActions([
                builder.CardAction.imBack(session, "productId=1&color=green", "Green"),
                builder.CardAction.imBack(session, "productId=1&color=blue", "Blue"),
                builder.CardAction.imBack(session, "productId=1&color=red", "Red")
            ]);
        session.send(msg);
        // session.send('안뇽하세욤! %s!', session.userData.name);
    }
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, '하이 모두들 안녕? 너는 누구닙?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);
