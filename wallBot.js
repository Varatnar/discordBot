const Discord = require("discord.js");
const config = require("./config.json");

const COMMAND = require("./constants.json").command;

const client = new Discord.Client();

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {

    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    determineCommand(message)
});

determineCommand = function (message) {
    console.log("Determining command");
    console.log(message.author.username);

    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    switch (command) {
        case COMMAND.help:
            printHelpToChannel(message);
            break;
        case COMMAND.roll:
            rollDiceAndPrintToChannel(message, args);
            break;
        default:
            return;
    }
};


printHelpToChannel = function (message) {
    message.channel.send(".\n\n" +
        "== Wall bot ==\n" +
        "  The available commands are :\n" +
        "    - !help       : shows this help interface\n" +
        "    - !roll xdy   : roll a certain number of dice and sends the results back\n" +
        "===========");
};

rollDiceAndPrintToChannel = function (message, args) {

    let firstSetOfDice;

    try {
        firstSetOfDice = args.shift().toLowerCase();

        console.log(firstSetOfDice);

        if (firstSetOfDice == null || firstSetOfDice == undefined) {
            printRollDiceHelp(message)
        }

        if (!firstSetOfDice.includes("d")) {
            printRollDiceHelp(message);
        }

        // Parsing die count and faces

        let [numberOfDice, facesForDie, err] = firstSetOfDice.split(/d/);

        if(err) {
            printRollDiceHelp(message);
            return;
        }

        console.log(numberOfDice);
        console.log(facesForDie);

        let result = rollDie(facesForDie);

        for (let i = 0; i < numberOfDice; i++) {
            let result = rollDie(facesForDie);
            message.channel.send(`You rolled ${result}`);
        }

    } catch (err) {
        printRollDiceHelp(message)

    }

};

rollDie = function(numberOfSide) {
    let max = Math.floor(numberOfSide);
    return Math.floor(Math.random() * (max)) + 1;
};

printRollDiceHelp = function(message){
    message.channel.send("Please provide a proper dice set to be rolled");
};

client.login(config.token);