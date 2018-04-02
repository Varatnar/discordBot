
export class GenericTask {

    private message: any;
    private channel: any;
    private demandee: any;

    constructor(message: any) {
        this.message = message;
        this.channel = message.channel;
        this.demandee = message.author.username;
    }

    execute() {
        throw "Abstract method not implemented !!!";
    }

    _sendToIncomingChannel(messageToSend: any) {
        this.channel.send(messageToSend);
    }

    getDemandee(): any {
        return this.demandee
    }
}
