import * as discord from "discord.js";
import { Message } from "discord.js";
import { Command } from "../tasks/Command";
import { DiceRoller } from "../tasks/DiceRoller";
import { Help } from "../tasks/Help";
import { ImagePoster } from "../tasks/ImagePoster";
import { BotConfig } from "./BotConfig";
import { BotLogger } from "./BotLogger";

export class Bot {

    private client: discord.Client;
    private config: BotConfig;
    private logger: BotLogger;
    private id: string;

    public start(logger: BotLogger, config: BotConfig) {
        this.logger = logger;
        this.config = config;

        if (!this.config.token) {
            throw new Error('Invalid discord token')
        }

        this.client = new discord.Client();
        this.client.on('ready', () => {
            this.id = this.client.user.id;

            this.logger.info('I am ready!')
        });

        this.client.on('message', (message: Message) => {

            this.logger.info(`Message found \n ${message.content}`);

            // Arbitrary image identifier "%"
            if (message.content.startsWith("%")) {
                let messageKey = message.content.slice("%".length).trim();

                ImagePoster.postImageFromKey(message, messageKey);

            }

            if (!message.content.startsWith(config.prefix) || message.author.bot) return;

            this.determineCommand(message);

        });

        this.client.login(this.config.token);
    }

    private determineCommand(message: Message) {
        this.logger.info(`Determining command made by ${message.author.username}`);
        let args = message.content.slice(this.config.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();

        try {

            switch (command) {
                case Command.help:
                    new Help(message).execute();
                    break;
                case Command.roll:
                    new DiceRoller(message, args).execute();
                    break;
                default:
                    break;
            }
        } catch (e) {
            this.logger.error(e);
        }

        this.logger.info("DONE");
    };
}