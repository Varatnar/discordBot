 class GenericTask {

    constructor(message) {
        this.message = message;
        this.channel = message.channel;
        this.demandee = message.author.username;
    }

    execute() {
        throw "Abstract method not implemented !!!";
    }

    _sendToIncomingChannel(messageToSend) {
        this.channel.send(messageToSend);
    }

}

module.exports = GenericTask;