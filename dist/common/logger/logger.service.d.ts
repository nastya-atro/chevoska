import { ConsoleLogger } from '@nestjs/common';
export declare class LoggerService extends ConsoleLogger {
    context: string;
    private logger;
    constructor(context?: string);
    error(message: any, stack?: any): void;
    info(message: any): void;
    private setMessageContext;
    private getConsoleTransport;
}
