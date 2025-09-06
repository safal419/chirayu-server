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
exports.ResultSchema = exports.Result = void 0;
const openapi = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
let Result = class Result {
    static _OPENAPI_METADATA_FACTORY() {
        return { batch: { required: true, type: () => String }, year: { required: true, type: () => String }, totalStudents: { required: true, type: () => Number }, successRate: { required: true, type: () => Number }, toppers: { required: true } };
    }
};
exports.Result = Result;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Result.prototype, "batch", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Result.prototype, "year", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Result.prototype, "totalStudents", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Result.prototype, "successRate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ name: String, grade: String, gpa: String, photo: String, school: String }], default: [] }),
    __metadata("design:type", Array)
], Result.prototype, "toppers", void 0);
exports.Result = Result = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Result);
exports.ResultSchema = mongoose_1.SchemaFactory.createForClass(Result);
//# sourceMappingURL=result.entity.js.map