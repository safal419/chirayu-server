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
const fs = require("fs");
const path = require("path");
let FileService = class FileService {
    constructor(fileModel) {
        this.fileModel = fileModel;
    }
    async uploadFiles(files) {
        try {
            const filePromises = files.map(async (file) => {
                const filePath = file.path;
                const fileContent = fs.readFileSync(filePath);
                fs.writeFileSync(filePath, fileContent);
                let relativePath = path.relative('uploads', filePath);
                relativePath = process.env.HOST + '/uploads/' + relativePath;
                const createdFile = new this.fileModel({
                    name: file.originalname,
                    path: relativePath,
                });
                await createdFile.save();
                return relativePath;
            });
            return Promise.all(filePromises);
        }
        catch (error) {
            console.error(error);
            throw new Error('Error uploading files');
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