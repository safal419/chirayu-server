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
exports.GallerySchema = exports.Gallery = void 0;
const openapi = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
let Gallery = class Gallery {
    static _OPENAPI_METADATA_FACTORY() {
        return { src: { required: true, type: () => [String] }, category: { required: true, type: () => String }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, date: { required: true, type: () => Date } };
    }
};
exports.Gallery = Gallery;
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], Gallery.prototype, "src", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Gallery.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Gallery.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Gallery.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], Gallery.prototype, "date", void 0);
exports.Gallery = Gallery = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Gallery);
exports.GallerySchema = mongoose_1.SchemaFactory.createForClass(Gallery);
//# sourceMappingURL=gallery.entity.js.map