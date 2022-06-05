require ("./html.js");
const { Client, Intents, Message } = require('discord.js');
const Discord = require('discord.js');
const { Console } = require('console');
const axios = require("axios");
const colors = require("colors");
const { channel } = require("diagnostics_channel");
const token = process.env['TOKEN']
const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
});
client.commands = new Discord.Collection()

// Prefix
const prefix = "!";

// For user you don't want to log message and don't delete the message
const userid = []

// For words you want to get delete
const banword = []


function terminal(text, color) {
    if (typeof(color) == "undefined") { console.log(text) }
    if (typeof(color) != "undefined") { console.log(colors[color](text)) }
}

client.on('ready', () => {
    terminal(`Logged in as ${client.user.tag}!`, "green");
});

// function log message very simple to use. Change channel id to channel you want bot to send the message that log.
client.on("messageCreate", msg => {
    if (msg.author.bot == true) return;
    for (var i = 0; i < userid.length; i++) {
        if (msg.author.id == userid[i]) {
            return;
        }
    }
    client.channels.cache.get("channel id").send(`Member id: ${msg.author.id}\nMember: <@${msg.author.id}>\nMessage Content: ${msg.content}\nTimes: ${msg.createdAt}`)
})

// Delete message function

client.on("messageCreate", msg => {
    if (msg.author.bot == true) return;
    for (var i = 0; i < userid; i++) {
        if (msg.content.includes(userid[i])) {
            return;
        }
    }
    for (var i = 0; i < banword; i++) {
        if (msg.content.includes(banword[i])) {
            // You can change time if you want and the times is in millisecond. 1000 milisecond = 1 second.
            msg.delete(1000);
        }
    }
})

client.login(token)

