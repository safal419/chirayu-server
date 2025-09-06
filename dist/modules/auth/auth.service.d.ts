import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthService {
    private userModel;
    private jwtSevice;
    constructor(userModel: Model<User>, jwtSevice: JwtService);
    validateUserCredentials(signInDo: SignInDto): Promise<{
        user: {
            name: any;
            email: any;
            role: any;
        };
        access_token: string;
    }>;
    generateToken(user: any): Promise<{
        user: {
            name: any;
            email: any;
            role: any;
        };
        access_token: string;
    }>;
}
