// Extract the required classes from the discord.js module
const { Client, Attachment } = require('discord.js');

// Create an instance of a Discord client
const client = new Client();
const admin = require('firebase-admin');

let serviceAccount = require('./echucaictbot-firebase-adminsdk-beoyz-dc0255ae89');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://echucaictbot.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/");

var moment = require('moment');
require('moment-recur');


var recurrence = moment( "2019-11-11" ).recur().every(2).weeks();
var Aschedule = require('node-schedule');



function sendmessage() {
    
    var guild = client.guilds.get('518999425213792259');
    if(guild && guild.channels.get('518999425646067717')){
        guild.channels.get('518999425646067717').send("ICT Club will be at tomorrow lunch.");
    }
}

function gettime() {


var ats = Date.now();

//        var adate_ob = new Date(ats);
//        var adate = adate_ob.getDate();
//        if (adate.toString().length == 1) {
//            adate = "0" + adate;
//        }
//        var amonth = adate_ob.getMonth() + 1;
//        if (amonth.toString().length == 1) {
//            amonth = "0" + amonth;
//        }
//        var ayear = adate_ob.getFullYear();
var date = moment(ats).add(1, 'days');
var adate_ob = new Date(date);
var adate = adate_ob.getDate();
if (adate.toString().length == 1) {
            adate = "0" + adate;
        }
        var amonth = adate_ob.getMonth() + 1;
        if (amonth.toString().length == 1) {
            amonth = "0" + amonth;
        }
        var ayear = adate_ob.getFullYear()
recurrence.fromDate(ayear + "-" + amonth + "-" + adate);
anextDates = recurrence.next(1, "L");
var anextdateobject = new Date(anextDates);
var anextdateDays = anextdateobject.getDate();
var anextdateMonth = anextdateobject.getMonth() +  1;
var anextdateYear = anextdateobject.getFullYear();
    

console.log(anextDates);
console.log("00 12 " + anextdateDays + " " + anextdateMonth + " *");
var j = Aschedule.scheduleJob("00 12 " + anextdateDays + " " + anextdateMonth + " *", function(){
    ref.once("value", function(snapshot) {
          data = snapshot.val();
          controls = data.controls;
          isRunning = controls.isRunning;
          console.log(isRunning);
          if (isRunning == 1) {
            sendmessage()
          }
        });

  
  gettime()
});

}








client.on('ready', () => {
  console.log('I am ready!');
  gettime()
  
});

//client.on('message', message => {
//    // If the message is '!time'
//    if (message.content === '!time') {
//        console.log("Got !time");
//        var ts = Date.now();
//
//        var date_ob = new Date(ts);
//        var date = date_ob.getDate();
//        
//        var month = date_ob.getMonth() + 1;
//        
//        var year = date_ob.getFullYear();
//        rInterval.fromDate(year + "-" + month + "-" + date);
//        nextDates = rInterval.next(1, "L");
//        var nextdateobject = new Date(nextDates);
//        var nextdateDays = nextdateobject.getDate();
//        var nextdateMonth = nextdateobject.getMonth() + 1;
//        var nextdateYear = nextdateobject.getFullYear();
//        console.log("The next meeting will be on the :" + nextdateDays + "/" + nextdateMonth + "/" + nextdateYear);
//        message.channel.send("The next meeting will be on the :" + nextdateDays + "/" + nextdateMonth + "/" + nextdateYear);
//    }
//});


client.login('NjM4NjczOTE5ODEzMDkxMzY5.XblCjg.w1ckNAEGk3Tvnb2O6c5RRcWjE5A');






        


