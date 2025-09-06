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
exports.NoticesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const notices_service_1 = require("./notices.service");
const create_notice_dto_1 = require("./dto/create-notice.dto");
const update_notice_dto_1 = require("./dto/update-notice.dto");
let NoticesController = class NoticesController {
    constructor(noticesService) {
        this.noticesService = noticesService;
    }
    create(createNoticeDto) {
        return this.noticesService.create(createNoticeDto);
    }
    findAll() {
        return this.noticesService.findAll();
    }
    findOne(id) {
        return this.noticesService.findOne(id);
    }
    update(id, updateNoticeDto) {
        return this.noticesService.update(id, updateNoticeDto);
    }
    remove(id) {
        return this.noticesService.remove(id);
    }
};
exports.NoticesController = NoticesController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/notice.entity").Notice }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notice_dto_1.CreateNoticeDto]),
    __metadata("design:returntype", void 0)
], NoticesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/notice.entity").Notice] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NoticesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/notice.entity").Notice }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NoticesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/notice.entity").Notice }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_notice_dto_1.UpdateNoticeDto]),
    __metadata("design:returntype", void 0)
], NoticesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NoticesController.prototype, "remove", null);
exports.NoticesController = NoticesController = __decorate([
    (0, common_1.Controller)('notices'),
    __metadata("design:paramtypes", [notices_service_1.NoticesService])
], NoticesController);
//# sourceMappingURL=notices.controller.js.map