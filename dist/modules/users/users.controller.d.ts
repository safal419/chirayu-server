import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    search(page: number, term: string): Promise<{
        HasMore: boolean;
        Results: (import("mongoose").Document<unknown, {}, import("./entities/user.entity").User, {}, {}> & import("./entities/user.entity").User & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    getById(id: string): Promise<import("./entities/user.entity").User>;
    get(page: number, limit: number, sortColumn?: string, sortDirection?: string, name?: string, email?: string): Promise<{
        TotalRecords: number;
        Data: (import("mongoose").Document<unknown, {}, import("./entities/user.entity").User, {}, {}> & import("./entities/user.entity").User & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    update(id: string, UpdateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    patchUpdate(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    delete(id: string): Promise<import("./entities/user.entity").User>;
    seedData(no: number): Promise<import("./entities/user.entity").User[]>;
}
