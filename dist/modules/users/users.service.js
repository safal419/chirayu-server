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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(createUserDto) {
        const existingUser = await this.userModel.findOne({ email: createUserDto.email });
        if (existingUser) {
            throw new common_1.BadRequestException('Email already exists.');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = new this.userModel({
            name: createUserDto.name,
            email: createUserDto.email,
            role: createUserDto.role,
            password: hashedPassword,
            profilePic: '',
            location: createUserDto.location || '',
            phoneNumber: createUserDto.phoneNumber || '',
        });
        return await newUser.save();
    }
    async findUsersByRoles(roles) {
        return await this.userModel.find({ role: { $in: roles } }).exec();
    }
    async updateUser(id, updateUserDto) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Invalid user ID');
        }
        const updatedFields = { ...updateUserDto };
        if (updateUserDto.password) {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
            if (!passwordRegex.test(updateUserDto.password)) {
                throw new common_1.BadRequestException('Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.');
            }
            updatedFields.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updatedFields, { new: true });
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return updatedUser;
    }
    async getUserById(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Invalid user ID');
        }
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getUsers(page, limit, sortColumn, sortDirection, name, email) {
        limit = Math.min(Math.max(limit, 5), 20);
        const skip = (page - 1) * limit;
        const filters = [];
        if (name)
            filters.push({ name: { $regex: new RegExp(name, 'i') } });
        if (email)
            filters.push({ email: { $regex: new RegExp(email, 'i') } });
        const query = filters.length ? { $and: filters } : {};
        const totalRecords = await this.userModel.countDocuments(query);
        const sortDefinition = {};
        const validSortColumns = ['name', 'createdAt', 'updatedAt'];
        const column = validSortColumns.includes(sortColumn) ? sortColumn : 'name';
        sortDefinition[column] = sortDirection === 'desc' ? -1 : 1;
        const data = await this.userModel
            .find(query)
            .select(['name', 'email', 'createdAt', 'updatedAt'])
            .skip(skip)
            .limit(limit)
            .sort(sortDefinition);
        return {
            TotalRecords: totalRecords,
            Data: data,
        };
    }
    async searchUsers(page, term) {
        const limit = 10;
        const skip = (page - 1) * limit;
        const filters = [];
        if (term) {
            filters.push({ name: { $regex: new RegExp(term, 'i') } });
            filters.push({ email: { $regex: new RegExp(term, 'i') } });
        }
        const query = filters.length ? { $or: filters } : {};
        const totalRecords = await this.userModel.countDocuments(query);
        const totalPages = Math.ceil(totalRecords / limit);
        const results = await this.userModel
            .find(query)
            .select(['_id', 'name', 'email'])
            .skip(skip)
            .limit(limit)
            .sort({ name: 1 });
        return {
            HasMore: page < totalPages,
            Results: results,
        };
    }
    async delete(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.NotFoundException('Invalid user ID');
        }
        const deletedUser = await this.userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return deletedUser;
    }
    async seedData(no = 100) {
        const createdUsers = [];
        for (let i = 0; i < no; i++) {
            const email = `testuser${i}@test.com`;
            const existing = await this.userModel.findOne({ email });
            if (existing)
                continue;
            const newUser = new this.userModel({
                name: 'Test User ' + i,
                email,
                role: 'user',
                password: await bcrypt.hash('Admin@123', 10),
                profilePic: '',
                location: '',
                phoneNumber: '',
            });
            createdUsers.push(await newUser.save());
        }
        return createdUsers;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map