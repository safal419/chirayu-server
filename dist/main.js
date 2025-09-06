"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose = require("mongoose");
const serverless_http_1 = require("serverless-http");
let cachedServerless = null;
let cachedAppInitialized = false;
async function createNestApp() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bodyParser: true });
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'https://chirayuacademy.edu.np',
            'https://rayueducationalacademy.netlify.app',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI environment variable not set');
    }
    if (!globalThis.__mongooseConnected) {
        await mongoose.connect(process.env.MONGO_URI);
        globalThis.__mongooseConnected = true;
    }
    await app.init();
    return app;
}
const handler = async (req, res) => {
    if (!cachedAppInitialized) {
        const app = await createNestApp();
        const expressInstance = app.getHttpAdapter().getInstance();
        cachedServerless = (0, serverless_http_1.default)(expressInstance);
        cachedAppInitialized = true;
    }
    return cachedServerless(req, res);
};
exports.handler = handler;
if (!process.env.VERCEL) {
    async function bootstrap() {
        const app = await createNestApp();
        const port = process.env.PORT || 3030;
        await app.listen(port);
        console.log(`🚀 App running on http://localhost:${port}`);
    }
    bootstrap();
}
//# sourceMappingURL=main.js.map