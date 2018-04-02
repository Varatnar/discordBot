import { Bot } from "./bot/Bot";
import { BotConfig } from "./bot/BotConfig";
import { BotLogger } from "./bot/BotLogger";

const logger: BotLogger = console;

let config = require("./../config.json") as BotConfig;

new Bot().start(logger, config);