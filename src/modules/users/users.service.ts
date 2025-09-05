import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new BadRequestException('Email already exists.');
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

  async findUsersByRoles(roles: string[]): Promise<User[]> {
    return await this.userModel.find({ role: { $in: roles } }).exec();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    const updatedFields: Partial<User> = { ...updateUserDto };

    // Password validation and hashing if password present
    if (updateUserDto.password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
      if (!passwordRegex.test(updateUserDto.password)) {
        throw new BadRequestException(
          'Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.',
        );
      }

      updatedFields.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async getUserById(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUsers(
    page: number,
    limit: number,
    sortColumn: string,
    sortDirection: string,
    name?: string,
    email?: string,
  ) {
    limit = Math.min(Math.max(limit, 5), 20);
    const skip = (page - 1) * limit;

    const filters: any[] = [];
    if (name) filters.push({ name: { $regex: new RegExp(name, 'i') } });
    if (email) filters.push({ email: { $regex: new RegExp(email, 'i') } });

    const query = filters.length ? { $and: filters } : {};

    const totalRecords = await this.userModel.countDocuments(query);

    const sortDefinition: Record<string, any> = {};
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

  async searchUsers(page: number, term: string) {
    const limit = 10;
    const skip = (page - 1) * limit;

    const filters: any[] = [];
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

  async delete(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Invalid user ID');
    }

    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }

    return deletedUser;
  }

  async seedData(no: number = 100): Promise<User[]> {
    const createdUsers: User[] = [];

    for (let i = 0; i < no; i++) {
      const email = `testuser${i}@test.com`;

      // Skip existing test users
      const existing = await this.userModel.findOne({ email });
      if (existing) continue;

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
}
