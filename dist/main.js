"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const session = require("express-session");
const nocache = require("nocache");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
const PORT = parseInt(process.env.PORT, 10) || 3001;
const HOST = process.env.HOST || 'localhost';
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix(process.env.ROUTER_PREFIX);
    if (process.env.ALLOW_CORS) {
        app.enableCors({
            origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN.split(','),
            credentials: true,
        });
    }
    app.use((0, helmet_1.default)());
    app.use(nocache());
    app.use(logger_middleware_1.logger);
    app.use(session({
        cookie: {
            sameSite: process.env.NODE_ENV === 'production'
                ? 'strict'
                : process.env.NODE_ENV === 'development'
                    ? 'none'
                    : false,
            httpOnly: true,
            secure: process.env.SESSION_SECURE === 'true',
        },
        secret: process.env.SESSION_SECRET,
        name: process.env.SESSION_NAME,
        resave: false,
        saveUninitialized: false,
        maxAge: 24 * 60 * 60 * 1000,
    }));
    await app.listen(PORT, HOST);
}
bootstrap();
//# sourceMappingURL=main.js.map