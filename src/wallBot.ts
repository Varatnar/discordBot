// Imports
import * as Discord from 'discord.js';
const config = require("./config.json");

const Help = require("./tasks/Help");
const DiceRoller = require("./tasks/DiceRoller");

const COMMAND = require("./constants.json").command;

// End imports

const client = new Discord.Client();

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {

    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    determineCommand(message)
});

determineCommand = function (message) {
    console.log(`Determining command made by ${message.author.username}`);

    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    let task = null;

    switch (command) {
        case COMMAND.help:
            task = new Help(message);
            break;
        case COMMAND.roll:
            task = new DiceRoller(message, args);
            break;
        default:
            break;
    }

    if(task != null) {
        task.execute();
    }

    console.log("DONE");
};

client.login(config.token);