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
exports.GalleryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const gallery_entity_1 = require("./entities/gallery.entity");
let GalleryService = class GalleryService {
    constructor(galleryModel) {
        this.galleryModel = galleryModel;
    }
    async create(createGalleryDto) {
        const gallery = new this.galleryModel(createGalleryDto);
        return gallery.save();
    }
    async findAll() {
        return this.galleryModel.find().sort({ createdAt: -1 }).exec();
    }
    async findOne(id) {
        const gallery = await this.galleryModel.findById(id).exec();
        if (!gallery) {
            throw new common_1.NotFoundException(`Gallery with ID ${id} not found`);
        }
        return gallery;
    }
    async update(id, updateGalleryDto) {
        const updatedGallery = await this.galleryModel
            .findByIdAndUpdate(id, updateGalleryDto, { new: true })
            .exec();
        if (!updatedGallery) {
            throw new common_1.NotFoundException(`Gallery with ID ${id} not found`);
        }
        return updatedGallery;
    }
    async remove(id) {
        const result = await this.galleryModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Gallery with ID ${id} not found`);
        }
    }
};
exports.GalleryService = GalleryService;
exports.GalleryService = GalleryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(gallery_entity_1.Gallery.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GalleryService);
//# sourceMappingURL=gallery.service.js.map