// Extract the required classes from the discord.js module
const { Client, Attachment } = require('discord.js');

// Create an instance of a Discord client
const client = new Client();
var admin = require('firebase-admin');
var serviceAccount = require("./echucaictbot-firebase-adminsdk-beoyz-dc0255ae89.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://echucaictbot.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/");
var getref = db.ref("/controls");


ref.once("value", function(snapshot) {
  data = snapshot.val();
  controls = data.controls;
  isRunning = controls.isRunning;
  console.log(isRunning);
});





var moment = require('moment');
require('moment-recur');

var rInterval = moment( "2019-11-12" ).recur().every(2).weeks();





client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
    // If the message is '!time'
    if (message.content === '!time') {
        var ts = Date.now();

        var date_ob = new Date(ts);
        var date = date_ob.getDate();
        if (date.toString().length == 1) {
            date = "0" + date;
        }
        var month = date_ob.getMonth() + 1;
        if (month.toString().length == 1) {
            month = "0" + month;
        }
        var year = date_ob.getFullYear();
        rInterval.fromDate(year + "-" + month + "-" + date);
        nextDates = rInterval.next(1, "L");
        var nextdateobject = new Date(nextDates);
        var nextdateDays = nextdateobject.getDate();
        var nextdateMonth = nextdateobject.getMonth() + 1;
        var nextdateYear = nextdateobject.getFullYear();
        ref.once("value", function(snapshot) {
          data = snapshot.val();
          controls = data.controls;
          isRunning = controls.isRunning;
          if (isRunning == 1) {
              message.channel.send("The next meeting will be on the :" + nextdateDays + "/" + nextdateMonth + "/" + nextdateYear);
          } else {
              message.channel.send("This bot is currently disabled.");
          }
        });
        //message.channel.send("The next meeting will be on the :" + nextdateDays + "/" + nextdateMonth + "/" + nextdateYear);
    } else {
        if (message.content === '!stop') {
        user = message.member;
        user = user.toString();
        if (user.includes("!")) {
            user = user.split("!")[1].split(">")[0];
        } else {
            user = user.split("@")[1].split(">")[0];
        }
        username = client.users.get(user).username
        if (user == '562508008777711626' || user == '519065244186705930') {
            ref.set({
              controls: {
                isRunning: 0
              }
            });
           message.channel.send("Done! Bot disabled."); 

        } else {
            message.channel.send("Sorry " + username + " you don't have permission to do that!");
        }
        
        
    } else {
       if (message.content === '!start') {
        user = message.member;
        user = user.toString();
        if (user.includes("!")) {
            user = user.split("!")[1].split(">")[0];
        } else {
            user = user.split("@")[1].split(">")[0];
        }
        username = client.users.get(user).username
        if (user == '562508008777711626' || user == '519065244186705930') {
            ref.set({
              controls: {
                isRunning: 1
              }
            });
           message.channel.send("Done! Bot enabled."); 

        } else {
            message.channel.send("Sorry " + username + " you don't have permission to do that!");
        }
        
        
        
        
    }
    } else {
       if (message.content === '!reschedule') {
        user = message.member;
        user = user.toString();
        if (user.includes("!")) {
            user = user.split("!")[1].split(">")[0];
        } else {
            user = user.split("@")[1].split(">")[0];
        }
        username = client.users.get(user).username
        if (user == '562508008777711626' || user == '519065244186705930') {
            ref.set({
              controls: {
                isRunning: 1
              }
            });
           message.channel.send("Done! Bot enabled."); 

        } else {
            message.channel.send("Sorry " + username + " you don't have permission to do that!");
        }
        
        
        
        
    }
    }
}
});

// Log our bot in using the token from https://discordapp.com/developers/applications/ me
client.login('NjM4NjczOTE5ODEzMDkxMzY5.XblCjg.w1ckNAEGk3Tvnb2O6c5RRcWjE5A');

var express = require('express')
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/website'));

app.get('/', function(req, res) {
	res.render('index');
})

app.listen(port, function() {
	console.log('app running')
})

