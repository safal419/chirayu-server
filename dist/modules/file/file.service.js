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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const multer_config_1 = require("../../multer-config");
let FileService = class FileService {
    constructor(fileModel) {
        this.fileModel = fileModel;
    }
    async uploadFiles(files) {
        if (!files || files.length === 0)
            return [];
        try {
            const uploads = await Promise.all(files.map(async (file) => {
                if (!file.buffer) {
                    throw new Error('File buffer is missing. Use memoryStorage for multer.');
                }
                const folder = process.env.CLOUDINARY_FOLDER || 'uploads';
                const result = await (0, multer_config_1.uploadBufferToCloudinary)(file.buffer, folder);
                const createdFile = new this.fileModel({
                    name: file.originalname,
                    path: result.secure_url,
                    publicId: result.public_id,
                    raw: result,
                });
                await createdFile.save();
                return result.secure_url;
            }));
            return uploads;
        }
        catch (error) {
            console.error('FileService.uploadFiles error', error);
            throw error;
        }
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(File.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FileService);
//# sourceMappingURL=file.service.js.map