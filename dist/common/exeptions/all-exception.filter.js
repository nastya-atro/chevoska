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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("@nestjs/core/constants");
const http_utils_1 = require("../utils/http.utils");
const logger_service_1 = require("../logger/logger.service");
let AllExceptionFilter = class AllExceptionFilter extends core_1.BaseExceptionFilter {
    constructor(adapterHost, logger) {
        super(adapterHost.httpAdapter);
        this.logger = logger;
    }
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        let message = exception.message;
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof common_1.HttpException) {
            message =
                exception.getResponse().message ||
                    constants_1.MESSAGES.UNKNOWN_EXCEPTION_MESSAGE;
            status = exception.getStatus();
        }
        const body = { message, errorCode: status };
        if (process.env.APP_LOGGER_ERROR) {
            this.logger.error(message, exception.stack);
        }
        ctx.getResponse().status(status).json(http_utils_1.response.error(body));
    }
};
AllExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost, logger_service_1.LoggerService])
], AllExceptionFilter);
exports.AllExceptionFilter = AllExceptionFilter;
//# sourceMappingURL=all-exception.filter.js.map