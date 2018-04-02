import { GenericTask } from "./GenericTask";

export class Help extends GenericTask{

    constructor(message: any) {
        super(message);
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