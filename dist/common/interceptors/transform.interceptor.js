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
exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const class_transformer_1 = require("class-transformer");
const core_1 = require("@nestjs/core");
const logger_service_1 = require("../logger/logger.service");
const http_utils_1 = require("../utils/http.utils");
let TransformInterceptor = class TransformInterceptor {
    constructor(reflector, logger) {
        this.reflector = reflector;
        this.logger = logger;
    }
    intercept(context, next) {
        const res = context.switchToHttp().getResponse();
        return next.handle().pipe((0, operators_1.map)((payload) => {
            if (payload === null || payload === void 0 ? void 0 : payload.statusCode) {
                res.status(payload.statusCode);
                delete payload.statusCode;
            }
            if (process.env.APP_LOGGER_INFO) {
                this.logger.info(payload);
            }
            return http_utils_1.response.ok({ payload: (0, class_transformer_1.instanceToPlain)(payload) });
        }));
    }
};
TransformInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        logger_service_1.LoggerService])
], TransformInterceptor);
exports.TransformInterceptor = TransformInterceptor;
//# sourceMappingURL=transform.interceptor.js.map