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
exports.ResultsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const result_entity_1 = require("./entities/result.entity");
let ResultsService = class ResultsService {
    constructor(resultModel) {
        this.resultModel = resultModel;
    }
    async create(createResultDto) {
        const result = new this.resultModel(createResultDto);
        return result.save();
    }
    async findAll() {
        return this.resultModel.find().sort({ year: -1, batch: 1 }).exec();
    }
    async findOne(id) {
        const result = await this.resultModel.findById(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Result with ID ${id} not found`);
        }
        return result;
    }
    async update(id, updateResultDto) {
        const updatedResult = await this.resultModel
            .findByIdAndUpdate(id, updateResultDto, { new: true })
            .exec();
        if (!updatedResult) {
            throw new common_1.NotFoundException(`Result with ID ${id} not found`);
        }
        return updatedResult;
    }
    async remove(id) {
        const result = await this.resultModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Result with ID ${id} not found`);
        }
    }
};
exports.ResultsService = ResultsService;
exports.ResultsService = ResultsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(result_entity_1.Result.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ResultsService);
//# sourceMappingURL=results.service.js.map