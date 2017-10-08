const GenericTask = require("./GenericTask.js");

class Help extends  GenericTask{

    constructor(message) {
        super(message)
    }

    execute() {

        const messageToSend = ".\n\n" +
            "== Wall bot ==\n" +
            "  The available commands are :\n" +
            "    - !help                : shows this help interface\n" +
            "    - !roll [x]d[y]    : roll x time a y faced die\n" +
            "===========";

        this._sendToIncomingChannel(messageToSend);
    }
}

module.exports = Help;