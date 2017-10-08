// Imports
const Discord = require("discord.js");
const config = require("./config.json");

const Help = require("./tasks/Help.js");

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
    console.log("Determining command");
    console.log(message.author.username);

    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    let task = null;

    switch (command) {
        case COMMAND.help:
            task = new Help(message);
            break;
        case COMMAND.roll:
            rollDiceAndPrintToChannel(message, args);
            break;
        default:
            break;
    }

    if(task != null) {
        task.execute();
    }

    console.log("DONE");
};

rollDiceAndPrintToChannel = function (message, args) {

    let firstSetOfDice;
    let results = [];
    let totalSum = 0;

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

        if (numberOfDice.match(/[^0-9]/) || facesForDie.match(/[^0-9]/)) {
            printRollDiceHelp(message);
            return;
        }

        if(err) {
            printRollDiceHelp(message);
            return;
        }

        if (numberOfDice > config.maxNumberOfDicePerRoll || facesForDie > config.maxNumberOfDieFace) {
            message.channel.send(`The maximum number of dice is ${config.maxNumberOfDicePerRoll} and the max number of faces for a die is ${config.maxNumberOfDieFace}`);
            return;
        }

        console.log(numberOfDice);
        console.log(facesForDie);

        for (let i = 0; i < numberOfDice; i++) {
            let result = rollDie(facesForDie);
            results.push(result);
            totalSum += result;
        }

        // ----  Building the output string
        let resultString = `${message.author.username} rolled ${firstSetOfDice}\n`;
        let wasWere;
        if (numberOfDice > 1) {
            wasWere = "s were";
        } else {
            wasWere = " was";
        }

        let firstResultString = `The result${wasWere} [${results[0]}`;

        if(numberOfDice > 1) {
            for (let i = 1; i < results.length; i++) {
                firstResultString += `, ${results[i]}`;
            }
        }

        // -- appending closure

        firstResultString += "].";

        if(results.length > 1)
        {
            firstResultString += `\nFor a total of \`${totalSum}\``
        }

        resultString += firstResultString;

        message.channel.send(resultString);

    } catch (err) {
        printRollDiceHelp(message);
        console.error(err);
    }

};

/**
 * Simulate a dice roll.
 *
 * @param numberOfSide Number of side of the die to roll
 * @returns {number} The result, between 1 and the number of side.
 */
rollDie = function(numberOfSide) {
    let max = Math.floor(numberOfSide);
    return Math.floor(Math.random() * (max)) + 1;
};

printRollDiceHelp = function(message){
    message.channel.send("Please provide a proper dice set to be rolled");
};

client.login(config.token);