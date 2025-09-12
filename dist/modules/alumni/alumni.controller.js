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
exports.AlumniController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const alumni_service_1 = require("./alumni.service");
const create_alumni_dto_1 = require("./dto/create-alumni.dto");
const update_alumni_dto_1 = require("./dto/update-alumni.dto");
let AlumniController = class AlumniController {
    constructor(alumniService) {
        this.alumniService = alumniService;
    }
    async findAll() {
        return this.alumniService.findAll();
    }
    async findOne(id) {
        return this.alumniService.findOne(id);
    }
    async create(createAlumniDto) {
        return this.alumniService.create(createAlumniDto);
    }
    async update(id, updateAlumniDto) {
        return this.alumniService.update(id, updateAlumniDto);
    }
    async remove(id) {
        return this.alumniService.remove(id);
    }
};
exports.AlumniController = AlumniController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/alumni.schema").Alumni] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlumniController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/alumni.schema").Alumni }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlumniController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/alumni.schema").Alumni }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_alumni_dto_1.CreateAlumniDto]),
    __metadata("design:returntype", Promise)
], AlumniController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/alumni.schema").Alumni }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_alumni_dto_1.UpdateAlumniDto]),
    __metadata("design:returntype", Promise)
], AlumniController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlumniController.prototype, "remove", null);
exports.AlumniController = AlumniController = __decorate([
    (0, common_1.Controller)('alumni'),
    __metadata("design:paramtypes", [alumni_service_1.AlumniService])
], AlumniController);
//# sourceMappingURL=alumni.controller.js.map