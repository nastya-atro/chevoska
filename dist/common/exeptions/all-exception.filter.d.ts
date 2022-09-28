import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from '../logger/logger.service';
export declare class AllExceptionFilter extends BaseExceptionFilter {
    private logger;
    constructor(adapterHost: HttpAdapterHost, logger: LoggerService);
    catch(exception: any, host: ArgumentsHost): Promise<void>;
}
