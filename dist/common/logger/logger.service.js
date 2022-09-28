"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const winston = require("winston");
const common_1 = require("@nestjs/common");
const uuid = require("uuid");
let LoggerService = class LoggerService extends common_1.ConsoleLogger {
    constructor(context = 'APP') {
        super();
        this.context = context;
        this.logger = winston.createLogger({
            transports: this.getConsoleTransport(),
        });
    }
    error(message, stack) {
        this.logger.log('error', this.setMessageContext(message, stack));
    }
    info(message) {
        this.logger.log('info', this.setMessageContext(message));
    }
    setMessageContext(message, stack) {
        const requestId = uuid.v1();
        if (typeof message === 'string') {
            return {
                message,
                requestId,
                context: this.context,
                stack,
            };
        }
        return Object.assign(Object.assign({}, message), { stack,
            requestId, context: this.context });
    }
    getConsoleTransport() {
        return new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp({ format: 'HH:mm:ss' }), winston.format.printf((info) => {
                const { timestamp, context, requestId, level, stack } = info, data = __rest(info, ["timestamp", "context", "requestId", "level", "stack"]);
                return `[${timestamp}] [${context}] [${requestId || ''}] ${level.toUpperCase()} ${data.message || JSON.stringify(data)} \n${stack || ''}`;
            })),
        });
    }
};
LoggerService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __metadata("design:paramtypes", [String])
], LoggerService);
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map