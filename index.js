require('dotenv').config()

let express = require('express');
let nodemailer = require('nodemailer')
let path = require('path');
let bodyParser = require('body-parser');

const port = 3000;

let app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => { res.render('index') });

app.post('/send-email', function (req, res) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER.PASS,
    } 
  });
  let mailOptions = {
    from: process.env.MAILER_USER,
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.body,
    html: req.body.body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      console.log('Message %s was sent %s', info.messageId, info.response);
      res.redirect('/');
    }
  });
});

app.listen(port, function () {
  console.log('Server is running at port:', port)
});
