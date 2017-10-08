const GenericTask = require("./GenericTask.js");
const config = require("../config.json");

class DiceRoller extends  GenericTask{

    constructor(message, diceInfo) {
        super(message);

        this._args = diceInfo;

        if(this._args == undefined || this._args == null) {
            this._printInvalidTask()
        }

        console.info(`New DiceRoller task made by ${this.demandee}`)
    }

    execute() {

        this._determineDiceSet();

        if(this._numberOfDie && this._facesForDie) {

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

    _determineDiceSet() {

        let diceSet = this._args.shift().toLowerCase();

        // The was nothing given to the task that identified to possible dice
        if (diceSet == null || diceSet== undefined || !diceSet.includes("d")) {
            this._printInvalidTask();
            return;
        }

        let [numberOfDice, facesForDie, err] = diceSet.split(/d/);

        // What was identified as dice was invalid
        if (err || numberOfDice.match(/[^0-9]/) || facesForDie.match(/[^0-9]/)) {
            this._printInvalidTask();
            return;
        }

        if (numberOfDice > config.maxNumberOfDicePerRoll || facesForDie > config.maxNumberOfDieFace) {
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
     * @private
     */
    _generateAnswerString(results, totalSum){

        let resultString = `${this.demandee} rolled ${this._diceSet}\n`;
        let wasWere;
        if (this._numberOfDie > 1) {
            wasWere = "s were";
        } else {
            wasWere = " was";
        }

        let firstResultString = `The result${wasWere} [${results[0]}`;

        if(this._numberOfDie > 1) {
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

        return resultString;
    }

    /**
     * Simulate a dice roll.
     *
     * @param numberOfSide Number of side of the die to roll
     * @returns {number} The result, between 1 and the number of side.
     * @private
     */
    static _rollDie(numberOfSide) {
        let max = Math.floor(numberOfSide);
        return Math.floor(Math.random() * (max)) + 1;
    };

    /**
     * Send some feedback to user when they made a mistake in their use of this task.
     *
     * @param errorCode Can change the invalid task message depending on its value
     * @private
     */
    _printInvalidTask(errorCode) {

        const invalidMessageGeneric =
            "Please provide a proper dice set to be rolled"
        ;

        const invalidNumberComparedToConfig =
            `The maximum number of dice is ${config.maxNumberOfDicePerRoll} and the max number of faces for a die is ${config.maxNumberOfDieFace}`
        ;

        if(errorCode == 1) {
            this._sendToIncomingChannel(invalidNumberComparedToConfig)
        } else {
            this._sendToIncomingChannel(invalidMessageGeneric);
        }
    }
}

module.exports = DiceRoller;