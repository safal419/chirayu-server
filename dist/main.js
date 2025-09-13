"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_config_1 = require("./~config/swagger.config");
const multer_config_1 = require("./multer-config");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, multer_config_1.configureCloudinary)();
    (0, swagger_config_1.swaggerModuleConfig)(app);
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.use('/uploads', express.static('uploads'));
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const port = Number(process.env.PORT) || 3030;
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
if (process.env.NODE_ENV !== 'serverless') {
    bootstrap();
}
exports.default = bootstrap;
//# sourceMappingURL=main.js.map