"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerModuleConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
const events_module_1 = require("../modules/events/events.module");
const auth_module_1 = require("../modules/auth/auth.module");
const gallery_module_1 = require("../modules/gallery/gallery.module");
const notices_module_1 = require("../modules/notices/notices.module");
const results_module_1 = require("../modules/results/results.module");
const users_module_1 = require("../modules/users/users.module");
const article_module_1 = require("../modules/article/article.module");
const alumni_module_1 = require("../modules/alumni/alumni.module");
const swaggerModuleConfig = (app) => {
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Root API')
        .setDescription('API For Admin Portal.')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const rootApiDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig, {
        include: [auth_module_1.AuthModule, users_module_1.UsersModule, notices_module_1.NoticesModule, results_module_1.ResultsModule, gallery_module_1.GalleryModule, events_module_1.EventsModule, article_module_1.ArticlesModule, alumni_module_1.AlumniModule],
    });
    swagger_1.SwaggerModule.setup('api', app, rootApiDocument);
};
exports.swaggerModuleConfig = swaggerModuleConfig;
//# sourceMappingURL=swagger.config.js.map