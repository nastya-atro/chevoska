"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const path = require("path");
const new_module_1 = require("./new/new.module");
const logger_module_1 = require("./common/logger/logger.module");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const all_exception_filter_1 = require("./common/exeptions/all-exception.filter");
const database_module_1 = require("./database/database.module");
const envFile = process.env.NODE_ENV
    ? `.env.${process.env.NODE_ENV}`
    : '.env.development';
const baseDir = path.join(__dirname, '../env');
const envPath = path.resolve(baseDir, `${envFile}`);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: [`${baseDir}/.env.development.local`, envPath],
            }),
            database_module_1.DatabaseModule.forRoot(),
            core_1.RouterModule.register([
                {
                    path: '',
                    module: new_module_1.NewModule,
                    children: [],
                },
            ]),
            new_module_1.NewModule,
            logger_module_1.LoggerModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interceptor_1.TransformInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: all_exception_filter_1.AllExceptionFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map