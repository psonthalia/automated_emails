const nodemailer = require('nodemailer');
const GSheetReader = require('g-sheets-api');

const fs = require('fs');

var auth = null
var options = null
var transporter = null
let sleep_duration = 10000

fs.readFile('config.json', (err, data) => {
    if (err) throw err;
    let config = JSON.parse(data);
  
    auth = {
      user: config["user"],
      pass: config["pass"],
    }
    options = {
      sheetId: config["sheetId"],
      sheetNumber: 1,
      returnAllResults: true,
    }
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: auth,
    });

    readGSheet();
});

sendEmail = async mailOptions => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}

mailOptionsList = []

function readGSheet() {
  GSheetReader(options, results => {
    for (var result of results) {
      if (result.email) {
        var mailOptions = {
          from: auth.user,
          to: result.email,
          subject: 'SUBJECT',
          html: `BODY_HTML`,
        }
        mailOptionsList.push(mailOptions);
      }
    }

    sendEmailScheduler = async index => {
      if (index < mailOptionsList.length) {
        sendEmail(mailOptionsList[index])
        console.log(mailOptionsList[index])
        setTimeout(sendEmailScheduler, sleep_duration, index+1);
      }
    }

    sendEmailScheduler(0);
  })
}
