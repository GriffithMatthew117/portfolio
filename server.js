//import { normalize } from 'path';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var twilio = require('twilio');

const app = express();


var accountSid = 'AC211492b5174e07ed6c58644c74b65aa6'; // Your Account SID from www.twilio.com/console
var authToken = '73dedda1ab9d02e27118cd6d6f86b13f'; // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+15634598306', // Text this number
    from: '+17608915959' // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));



app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))


//Here we're setting the views directory to be ./views
//thereby letting the app know where to find the template files
app.set('views', './views');


app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public/ionicons'))
//Here we're setting the default engine to be ejs
//note we don't need to require it, express will do all that for us
app.set('view engine', 'ejs');

//Now instead of using res.send we can use
//res.render to send the output of the template by filename
app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// app.get('/about', (req, res) => {
//   res.render('about');
// });

// app.get('/portfolio', (req, res) => {
//   res.render('portfolio');
// });

app.get('/fido', (req, res) => {
  res.render('fido');
});

app.get('/tracker', (req, res) => {
  res.render('tracker');
});


// app.get('/thanks', (req, res) => {
//   res.render('thanks');
// });

// app.get('/single-project', (req, res) => {
//   res.render('single-project');
// });

app.post('/contact', (req, res) => {
  var accountSid = 'AC211492b5174e07ed6c58644c74b65aa6'; // Your Account SID from www.twilio.com/console
  var authToken = '73dedda1ab9d02e27118cd6d6f86b13f'; // Your Auth Token from www.twilio.com/console

  var twilio = require('twilio');
  var client = new twilio(accountSid, authToken);


  const data = {
    person: {
      firstName: req.body.firstName
    }
  }

  client.messages.create({
      name: req.body.firstName,
      email: req.body.email,
      object: req.body.subject,
      body: `${req.body.firstName}  just contacted you: Email: ${req.body.email} Subject: ${req.body.subject} Message: ${req.body.message}`,
      to: '+15634598306',
      from: '+17608915959'
    })
    .then((message) => {
      console.log(message.sid);
      console.log("Data is ", data);
      res.render('contact', data);
    });
})


//var port = normalizePort(process.env.PORT || '8080');
var portInfo = process.env.PORT || '8080';
var port = parseInt(portInfo, 10);


app.listen(port, () => {
  console.log('listening at port ' + port)
});

app.get('/', (req, res) => {
  const data = {
    person: {
      firstName: req.body.name
    }
  }

  // Notice now the data is the second argument passed to the template render method
  res.render('index', data);
});