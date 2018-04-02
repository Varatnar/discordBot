export interface BotLogger {
    debug: LogMessage
    info: LogMessage
    warn: LogMessage
    error: LogMessage
}

export interface LogMessage {
    (msg: string, ...args: any[]): void
    (obj: object, msg?: string, ...args: any[]): void
}