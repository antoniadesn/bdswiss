var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");



 


/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
 
 //app.use(express.bodyParser());
 
	app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());


app.post('/test', function (req, res) {
var date = new Date();

    var hour = date.getHours();
    var sms;
    sms = (hour < 12 ? "Good morning! Your promocode is AM123" : "Hello! Your promocode is PM456");
	var mobileNumber = req.body.mobile;

	
	res.writeHead(200, {'Content-Type': 'text/plain'});
	// Twilio Credentials 
var accountSid = 'AC4c1cd6a9ebe23bbf11cc68354f8354da'; 
var authToken = 'e27e7695d31ce2aa7fe002d51f9dbb0e'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
	client.messages.create({ 
    to: mobileNumber, 
    from: "+15084667103", 
    body: sms, 
}, function(err, message) { 
    console.log(message.sid); 
});

	
  res.end(sms);
  })

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})
