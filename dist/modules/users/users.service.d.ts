import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findUsersByRoles(roles: string[]): Promise<User[]>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    getUserById(id: string): Promise<User>;
    getUsers(page: number, limit: number, sortColumn: string, sortDirection: string, name?: string, email?: string): Promise<{
        TotalRecords: number;
        Data: (import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    searchUsers(page: number, term: string): Promise<{
        HasMore: boolean;
        Results: (import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    delete(id: string): Promise<User>;
    seedData(no?: number): Promise<User[]>;
}
