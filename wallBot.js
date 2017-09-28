const Discord = require("discord.js");
const config = require("./config.json");

const COMMAND = require("./constants.json").command;

const client = new Discord.Client();

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {

    if(!message.content.startsWith(config.prefix) || message.author.bot) return;

    determineCommand(message)
});

determineCommand = function(message){
    console.log("Determining command");
    console.log(message.author.username);

    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    switch (command){
        case COMMAND.help:
            printHelpToChannel(message);
            break;
        case COMMAND.roll:
            break;
        default:
            return;
    }
};


printHelpToChannel = function(message) {
    message.channel.send(".\n\n" +
        "== Wall bot ==\n" +
        "  The available commands are :\n" +
        "    - !help       : shows this help interface\n" +
        "    - !roll xdy   : roll a certain number of dice and sends the results back\n" +
        "===========");

};

client.login(config.token);