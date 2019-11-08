// Extract the required classes from the discord.js module
const { Client, Attachment } = require('discord.js');

// Create an instance of a Discord client
const client = new Client();





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
        
        message.channel.send("The next meeting will be on the :" + nextdateDays + "/" + nextdateMonth + "/" + nextdateYear);
    }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/ me
client.login('NjM4NjczOTE5ODEzMDkxMzY5.XblCjg.w1ckNAEGk3Tvnb2O6c5RRcWjE5A');

