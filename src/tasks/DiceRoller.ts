import { Message } from "discord.js";
import { BotConfig } from "../bot/BotConfig";
import { GenericTask } from "./GenericTask";


export class DiceRoller extends GenericTask {

    private _args: any;
    private _numberOfDie: number;
    private _facesForDie: number;
    private _diceSet: number;

    private config: BotConfig = require("./../config.json");

    constructor(message: Message, diceInfo: any) {
        super(message);

        this._args = diceInfo;

        if (this._args == undefined || this._args == null) {
            this._printInvalidTask()
        }

        console.info(`New DiceRoller task made by ${this.getDemandee()}`)
    }

    /**
     * Main execute, will be run from main.
     */
    execute() {

        this._determineDiceSet();

        if (this._numberOfDie && this._facesForDie) {

            let results = [];
            let totalSum = 0;

            for (let i = 0; i < this._numberOfDie; i++) {
                let result = DiceRoller._rollDie(this._facesForDie);
                results.push(result);
                totalSum += result;
            }

            console.info(`The results were ${results}`);
            console.info(`Total was ${totalSum}`);

            this._sendToIncomingChannel(this._generateAnswerString(results, totalSum));
        }
    }

    /**
     * Finding out what will be rolled, storing that data inside this object.
     *
     * @private
     */
    _determineDiceSet() {

        let diceSet = this._args.shift().toLowerCase();

        // The was nothing given to the task that identified to possible dice
        if (diceSet == null || diceSet == undefined || !diceSet.includes("d")) {
            this._printInvalidTask();
            return;
        }

        let [numberOfDice, facesForDie, err] = diceSet.split(/d/);

        // What was identified as dice was invalid
        if (err || numberOfDice.match(/[^0-9]/) || facesForDie.match(/[^0-9]/)) {
            this._printInvalidTask();
            return;
        }

        if (numberOfDice > this.config.maxNumberOfDicePerRoll || facesForDie > this.config.maxNumberOfDieFace) {
            this._printInvalidTask(1);
            return;
        }

        this._diceSet = diceSet;
        this._numberOfDie = numberOfDice;
        this._facesForDie = facesForDie;

        console.info(`The roll will be ${numberOfDice} dice with ${facesForDie} faces`)
    }

    /**
     * Create a string with the results of the roll(s).
     *
     * @param results Array of results
     * @param totalSum The sum of that array
     * @returns {string} Human readable presentation of results.
     * @private
     */
    _generateAnswerString(results: any, totalSum: any) {

        let resultString = `${this.getDemandee()} rolled ${this._diceSet}\n`;
        let wasWere;
        if (this._numberOfDie > 1) {
            wasWere = "s were";
        } else {
            wasWere = " was";
        }

        let firstResultString = `The result${wasWere} [${results[0]}`;

        if (this._numberOfDie > 1) {
            for (let i = 1; i < results.length; i++) {
                firstResultString += `, ${results[i]}`;
            }
        }

        // -- appending closure

        firstResultString += "].";

        if (results.length > 1) {
            firstResultString += `\nFor a total of \`${totalSum}\``
        }

        resultString += firstResultString;

        return resultString;
    }

    /**
     * Simulate a dice roll.
     *
     * @param numberOfSide Number of side of the die to roll
     * @returns {number} The result, between 1 and the number of side.
     * @private
     */
    static _rollDie(numberOfSide: any) {
        let max = Math.floor(numberOfSide);
        return Math.floor(Math.random() * (max)) + 1;
    };

    /**
     * Send some feedback to user when they made a mistake in their use of this task.
     *
     * @param errorCode Can change the invalid task message depending on its value
     * @private
     */
    _printInvalidTask(errorCode?: any) {

        const invalidMessageGeneric =
            "Please provide a proper dice set to be rolled"
        ;

        const invalidNumberComparedToConfig =
            `The maximum number of dice is ${this.config.maxNumberOfDicePerRoll} and the max number of faces for a die is ${this.config.maxNumberOfDieFace}`
        ;

        if (errorCode == 1) {
            this._sendToIncomingChannel(invalidNumberComparedToConfig)
        } else {
            this._sendToIncomingChannel(invalidMessageGeneric);
        }
    }
}