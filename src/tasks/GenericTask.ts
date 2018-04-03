import { Message } from "discord.js";

export class GenericTask {

    private message: any;
    private channel: any;
    private demandee: any;

    constructor(message: Message) {
        this.message = message;
        this.channel = message.channel;
        this.demandee = message.author.username;
    }

    execute() {
        throw "Abstract method not implemented !!!";
    }

    _sendToIncomingChannel(messageToSend: string) {
        this.channel.send(messageToSend);
    }

    getDemandee(): any {
        return this.demandee
    }
}
