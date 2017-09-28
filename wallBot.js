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
    console.log(message);

    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    console.log(command);

    switch (command){
        case COMMAND.help:
            printHelpToChannel();
            break;
        case COMMAND.roll:
            break;
        default:
            return;
    }
};


printHelpToChannel = function() {
};

client.login(config.token);