import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { LoggerService } from '../logger/logger.service';
export interface Response {
    payload: any;
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, Response> {
    private readonly reflector;
    private logger;
    constructor(reflector: Reflector, logger: LoggerService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response>;
}
