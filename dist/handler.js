"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const common_1 = require("@nestjs/common");
const swagger_config_1 = require("./~config/swagger.config");
const multer_config_1 = require("./multer-config");
const app_module_1 = require("./app.module");
const express = require("express");
const serverless_http_1 = require("serverless-http");
let server = null;
async function bootstrapExpressApp() {
    const expressApp = express();
    const nestApp = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp), {
        logger: ['error', 'warn', 'log'],
    });
    (0, multer_config_1.configureCloudinary)();
    (0, swagger_config_1.swaggerModuleConfig)(nestApp);
    nestApp.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    nestApp.use('/uploads', express.static('uploads'));
    nestApp.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    await nestApp.init();
    return expressApp;
}
module.exports = async (req, res) => {
    try {
        if (!server) {
            const app = await bootstrapExpressApp();
            server = (0, serverless_http_1.default)(app);
        }
        return server(req, res);
    }
    catch (err) {
        console.error('Serverless handler bootstrap error', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
};
//# sourceMappingURL=handler.js.map